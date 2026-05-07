import { sql } from "kysely";
import z from "zod";

import { type DatabaseConnection } from "../../database/connection";
import { userBookStatusSchema } from "../../database/enums/user-book-status";

type SearchBookResult =
  | { ok: true; data: { books: BookWithDetails[] } }
  | { ok: false };

type BookWithDetails = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  preview: string | null;
  averageRating: number;
  feedbackCount: number;
  genres: { id: string; name: string; bookId: string }[];
  authors: {
    id: string;
    avatar: string | null;
    firstname: string;
    lastname: string;
    middlename: string | null;
    dateOfBirth: Date;
    biography: string;
    bookId: string;
  }[];
};

export const filterSchema = z.object({
  title: z.string().optional(),
  genres: z
    .union([z.string(), z.array(z.string())])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .optional(),
  authors: z
    .union([z.string(), z.array(z.string())])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .optional(),
  userBookStatus: z
    .object({
      userId: z.string(),
      status: z
        .union([userBookStatusSchema, z.array(userBookStatusSchema)])
        .transform((v) => (Array.isArray(v) ? v : [v])),
    })
    .optional(),
  raiting: z
    .object({
      min: z.coerce.number().optional(),
      max: z.coerce.number().optional(),
    })
    .optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  orderBy: z.discriminatedUnion("type", [
    z.object({ type: z.literal("title"), order: z.enum(["asc", "desc"]) }),
    z.object({ type: z.literal("raiting"), order: z.enum(["asc", "desc"]) }),
    z.object({ type: z.literal("createdAt"), order: z.enum(["asc", "desc"]) }),
  ]),
});

export type Filter = z.infer<typeof filterSchema>;

export function searchBookQueryFactory(databaseConnection: DatabaseConnection) {
  return async (filter: Filter): Promise<SearchBookResult> => {
    try {
      const result = await fetchBooksWithDetails(databaseConnection, filter);

      return { ok: true, data: { books: result } };
    } catch (error) {
      console.error(error);

      return {
        ok: false,
      };
    }
  };
}

async function fetchBooksWithDetails(
  db: DatabaseConnection,
  filter: Filter,
): Promise<BookWithDetails[]> {
  // 1. Сначала определяем ID книг, прошедших фильтрацию
  const filteredBookIds = await getFilteredBookIds(db, filter);

  if (filteredBookIds.length === 0) {
    return [];
  }

  // 2. Получаем книги с пагинацией и сортировкой
  const books = await getBooksByIds(db, filteredBookIds, filter);

  if (books.length === 0) {
    return [];
  }

  const bookIds = books.map((b) => b.id);

  // 3. Параллельно получаем связанные данные
  const [genres, authors] = await Promise.all([
    getBooksGenres(db, bookIds),
    getBooksAuthors(db, bookIds, filter.authors),
  ]);

  // 4. Собираем результат
  return books.map((book) => ({
    ...book,
    averageRating: Number.parseInt(book.averageRating as unknown as string),
    feedbackCount: Number.parseInt(book.feedbackCount as unknown as string),
    genres: genres.filter((g) => g.bookId === book.id),
    authors: authors.filter((a) => a.bookId === book.id),
  }));
}

async function getFilteredBookIds(
  db: DatabaseConnection,
  filter: Filter,
): Promise<string[]> {
  let query = db
    .selectFrom("book")
    .leftJoin("bookFeedback", "book.id", "bookFeedback.bookId")
    .select("book.id")
    .groupBy("book.id");

  if (filter.userBookStatus) {
    const { userId, status } = filter.userBookStatus;

    query = query
      .innerJoin("userBookStatus", "book.id", "userBookStatus.bookId")
      .where("userBookStatus.userId", "=", userId)
      .where("userBookStatus.status", "in", status);
  }

  // Фильтр по названию
  if (filter.title) {
    query = query.where("book.title", "ilike", `%${filter.title}%`);
  }

  // Фильтр по рейтингу
  if (filter.raiting) {
    query = query.having((eb) =>
      eb.and([
        filter.raiting?.min !== undefined
          ? eb(
              eb.fn.coalesce(
                eb.fn.avg<number>("bookFeedback.score"),
                sql<number>`0`,
              ),
              ">=",
              filter.raiting.min,
            )
          : eb.val(true),
        filter.raiting?.max !== undefined
          ? eb(
              eb.fn.coalesce(
                eb.fn.avg<number>("bookFeedback.score"),
                sql<number>`0`,
              ),
              "<=",
              filter.raiting.max,
            )
          : eb.val(true),
      ]),
    );
  }

  // Фильтр по жанрам
  if (filter.genres?.length) {
    const genreBookIds = await db
      .selectFrom("bookBookGenre")
      .innerJoin("bookGenre", "bookBookGenre.bookGenreId", "bookGenre.id")
      .select("bookBookGenre.bookId")
      .where("bookGenre.name", "in", filter.genres)
      .groupBy("bookBookGenre.bookId")
      .having((eb) => eb.fn.count("bookGenre.id"), "=", filter.genres!.length)
      .execute();

    const validIds = new Set(genreBookIds.map((b) => b.bookId));
    query = query.where("book.id", "in", [...validIds]);
  }

  // Фильтр по авторам
  if (filter.authors?.length) {
    const authorBookIds = await db
      .selectFrom("bookBookAuthor")
      .innerJoin("bookAuthor", "bookBookAuthor.bookAuthorId", "bookAuthor.id")
      .select("bookBookAuthor.bookId")
      .where((eb) =>
        eb.or(
          filter.authors!.map((authorName) =>
            eb(
              eb.fn("concat", [
                "bookAuthor.lastname",
                eb.val(" "),
                "bookAuthor.firstname",
              ]),
              "ilike",
              `%${authorName}%`,
            ),
          ),
        ),
      )
      .execute();

    const validIds = new Set(authorBookIds.map((b) => b.bookId));
    query = query.where("book.id", "in", [...validIds]);
  }

  const result = await query.execute();

  return result.map((r) => r.id);
}

async function getBooksByIds(
  db: DatabaseConnection,
  bookIds: string[],
  filter: Filter,
) {
  let query = db
    .selectFrom("book")
    .leftJoin("bookFeedback", "book.id", "bookFeedback.bookId")
    .select((eb) => [
      "book.id",
      "book.title",
      "book.preview",
      "book.createdAt",
      "book.updatedAt",
      eb.fn
        .coalesce(eb.fn.avg<number>("bookFeedback.score"), sql<number>`0`)
        .as("averageRating"),
      eb.fn.count<number>("bookFeedback.createdAt").as("feedbackCount"),
    ])
    .where("book.id", "in", bookIds)
    .groupBy(["book.id"]);

  // Сортировка
  if (filter.orderBy.type === "createdAt") {
    query = query
      .orderBy("book.createdAt", filter.orderBy.order)
      .orderBy("book.id", "asc");
  }

  if (filter.orderBy.type === "title") {
    query = query
      .orderBy("book.title", filter.orderBy.order)
      .orderBy("book.id", "asc");
  } else {
    query = query
      .orderBy(
        (eb) =>
          eb.fn.coalesce(
            eb.fn.avg<number>("bookFeedback.score"),
            sql<number>`0`,
          ),
        filter.orderBy.order,
      )
      .orderBy("book.id", "asc");
  }

  // Пагинация
  if (filter.offset !== undefined) {
    query = query.offset(filter.offset);
  }

  if (filter.limit !== undefined) {
    query = query.limit(filter.limit);
  }

  return query.execute();
}

async function getBooksGenres(db: DatabaseConnection, bookIds: string[]) {
  return db
    .selectFrom("bookBookGenre")
    .innerJoin("bookGenre", "bookBookGenre.bookGenreId", "bookGenre.id")
    .select(["bookBookGenre.bookId", "bookGenre.id", "bookGenre.name"])
    .where("bookBookGenre.bookId", "in", bookIds)
    .execute();
}

async function getBooksAuthors(
  db: DatabaseConnection,
  bookIds: string[],
  authorFilter?: string[],
) {
  let query = db
    .selectFrom("bookBookAuthor")
    .innerJoin("bookAuthor", "bookBookAuthor.bookAuthorId", "bookAuthor.id")
    .select([
      "bookBookAuthor.bookId",
      "bookAuthor.id",
      "bookAuthor.firstname",
      "bookAuthor.lastname",
      "bookAuthor.middlename",
      "bookAuthor.dateOfBirth",
      "bookAuthor.biography",
      "bookAuthor.avatar",
    ])
    .where("bookBookAuthor.bookId", "in", bookIds);

  if (authorFilter?.length) {
    query = query.where((eb) =>
      eb.or(
        authorFilter.map((authorName) =>
          eb(
            eb.fn("concat", [
              "bookAuthor.lastname",
              eb.val(" "),
              "bookAuthor.firstname",
            ]),
            "ilike",
            `%${authorName}%`,
          ),
        ),
      ),
    );
  }

  return query.execute();
}
