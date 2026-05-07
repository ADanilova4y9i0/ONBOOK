import { type DatabaseConnection } from "../../database/connection";

export type AddBookAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function addBookAuthorCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    bookId: string,
    authorId: string,
  ): Promise<AddBookAuthorResult> => {
    const relation = await databaseConnection
      .insertInto("bookBookAuthor")
      .values({
        bookId: bookId,
        bookAuthorId: authorId,
      })
      .returning(["bookBookAuthor.createdAt"])
      .executeTakeFirst();

    if (relation === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
    };
  };
}

export type CreateBookAuthorCommand = ReturnType<
  typeof addBookAuthorCommandFactory
>;
