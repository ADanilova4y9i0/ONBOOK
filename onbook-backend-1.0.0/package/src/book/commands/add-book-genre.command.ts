import { type DatabaseConnection } from "../../database/connection";

export type AddBookGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function addBookGenreCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    bookId: string,
    genreId: string,
  ): Promise<AddBookGenreResult> => {
    const relation = await databaseConnection
      .insertInto("bookBookGenre")
      .values({
        bookId: bookId,
        bookGenreId: genreId,
      })
      .returning(["bookBookGenre.createdAt"])
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

export type AddBookGenreCommand = ReturnType<typeof addBookGenreCommandFactory>;
