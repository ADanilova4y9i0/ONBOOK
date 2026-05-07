import { type DatabaseConnection } from "../../database/connection";

export type GetBookAuthorsResult =
  | {
      ok: true;
      data: {
        authors: {
          id: string;
          firstname: string;
          lastname: string;
          middlename: string | null;
        }[];
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function getBookAuthorsQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (bookId: string): Promise<GetBookAuthorsResult> => {
    const authors = await databaseConnection
      .selectFrom("bookBookAuthor")
      .innerJoin("bookAuthor", "bookBookAuthor.bookAuthorId", "bookAuthor.id")
      .select([
        "bookAuthor.id",
        "bookAuthor.firstname",
        "bookAuthor.middlename",
        "bookAuthor.lastname",
      ])
      .where("bookBookAuthor.bookId", "=", bookId)
      .execute();

    return {
      ok: true,
      data: {
        authors: authors,
      },
    };
  };
}

export type GetBookAuthorsQuery = ReturnType<typeof getBookAuthorsQueryFactory>;
