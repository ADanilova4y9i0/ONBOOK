import { type DatabaseConnection } from "../../database/connection";

export type GetBookAuthorsResult =
  | {
      ok: true;
      data: {
        author: {
          firstname: string;
          lastname: string;
          middlename: string | null;
        };
      };
    }
  | {
      ok: false;
      error: "unknown" | "book_author.not_found";
    };

export function getBookAuthorQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (bookAuthorId: string): Promise<GetBookAuthorsResult> => {
    const author = await databaseConnection
      .selectFrom("bookAuthor")
      .select([
        "bookAuthor.firstname",
        "bookAuthor.middlename",
        "bookAuthor.lastname",
      ])
      .where("bookAuthor.id", "=", bookAuthorId)
      .executeTakeFirst();

    if (author === undefined) {
      return {
        ok: false,
        error: "book_author.not_found",
      };
    }

    return {
      ok: true,
      data: {
        author: author,
      },
    };
  };
}

export type GetBookAuthorQuery = ReturnType<typeof getBookAuthorQueryFactory>;
