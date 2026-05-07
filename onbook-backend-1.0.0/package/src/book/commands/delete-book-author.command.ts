import { type DatabaseConnection } from "../../database/connection";

export type DeleteBookAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function deleteBookAuthorCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (id: string): Promise<DeleteBookAuthorResult> => {
    await databaseConnection.transaction().execute(async (trx) => {
      await trx
        .deleteFrom("bookBookAuthor")
        .where("bookBookAuthor.bookAuthorId", "=", id)
        .execute();

      await trx
        .deleteFrom("bookAuthor")
        .where("bookAuthor.id", "=", id)
        .returning(["bookAuthor.id"])
        .executeTakeFirst();
    });

    return {
      ok: true,
    };
  };
}

export type DeleteBookAuthorCommand = ReturnType<
  typeof deleteBookAuthorCommandFactory
>;
