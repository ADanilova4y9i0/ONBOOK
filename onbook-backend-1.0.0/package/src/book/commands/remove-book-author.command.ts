import { type DatabaseConnection } from "../../database/connection";

export type RemoveBookAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function removeBookAuthorCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    bookId: string,
    authorId: string,
  ): Promise<RemoveBookAuthorResult> => {
    const relation = await databaseConnection
      .deleteFrom("bookBookAuthor")
      .where((eb) =>
        eb.and([
          eb("bookBookAuthor.bookId", "=", bookId),
          eb("bookBookAuthor.bookAuthorId", "=", authorId),
        ]),
      )
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

export type RemoveBookAuthorCommand = ReturnType<
  typeof removeBookAuthorCommandFactory
>;
