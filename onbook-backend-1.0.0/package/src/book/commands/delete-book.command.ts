import { type DatabaseConnection } from "../../database/connection";

export type DeleteBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function deleteBookCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (id: string): Promise<DeleteBookResult> => {
    await databaseConnection.transaction().execute(async (trx) => {
      await trx
        .deleteFrom("bookBookGenre")
        .where("bookBookGenre.bookId", "=", id)
        .execute();

      await trx
        .deleteFrom("bookBookAuthor")
        .where("bookBookAuthor.bookId", "=", id)
        .execute();

      await trx
        .deleteFrom("bookFeedback")
        .where("bookFeedback.bookId", "=", id)
        .execute();

      await trx.deleteFrom("book").where("book.id", "=", id).execute();
    });

    return {
      ok: true,
    };
  };
}

export type DeleteBookCommand = ReturnType<typeof deleteBookCommandFactory>;
