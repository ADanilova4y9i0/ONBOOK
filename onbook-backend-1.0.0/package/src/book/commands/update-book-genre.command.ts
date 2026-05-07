import { type DatabaseConnection } from "../../database/connection";

export type UpdateBookGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function updateBookGenreCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (id: string, name?: string): Promise<UpdateBookGenreResult> => {
    const bookGenre = await databaseConnection
      .updateTable("bookGenre")
      .where("bookGenre.id", "=", id)
      .set({
        updatedAt: new Date(),
        name: name,
      })
      .returning(["bookGenre.id"])
      .executeTakeFirst();

    if (bookGenre === undefined) {
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

export type UpdateBookGenreCommand = ReturnType<
  typeof updateBookGenreCommandFactory
>;
