import { type DatabaseConnection } from "../../database/connection";

export type DeleteBookGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function deleteBookGenreCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (id: string): Promise<DeleteBookGenreResult> => {
    await databaseConnection.transaction().execute(async (trx) => {
      await trx
        .deleteFrom("bookBookGenre")
        .where("bookBookGenre.bookGenreId", "=", id)
        .execute();

      await trx
        .deleteFrom("bookGenre")
        .where("bookGenre.id", "=", id)
        .returning(["bookGenre.id"])
        .executeTakeFirst();
    });

    return {
      ok: true,
    };
  };
}

export type DeleteBookGenreCommand = ReturnType<
  typeof deleteBookGenreCommandFactory
>;
