import { sql } from "kysely";

import { type DatabaseConnection } from "../../database/connection";

export type GetBookResult =
  | {
      ok: true;
      data: {
        book: {
          id: string;
          title: string;
          description: string;
          attrs: Record<string, string>;
          preview: string | null;
          averageRating: number;
        };
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function getBookQueryFactory(databaseConnection: DatabaseConnection) {
  return async (bookId: string): Promise<GetBookResult> => {
    const book = await databaseConnection
      .selectFrom("book")
      .leftJoin("bookFeedback", "book.id", "bookFeedback.bookId")
      .select((eb) => [
        "book.id",
        "book.title",
        "book.preview",
        "book.description",
        "book.attrs",
        eb.fn
          .coalesce(eb.fn.avg<number>("bookFeedback.score"), sql<number>`0`)
          .as("averageRating"),
      ])
      .where("book.id", "=", bookId)
      .groupBy("book.id")
      .executeTakeFirst();

    if (book === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
      data: {
        book: {
          ...book,
          averageRating: Number(book.averageRating as unknown as string),
        },
      },
    };
  };
}

export type GetBookQuery = ReturnType<typeof getBookQueryFactory>;
