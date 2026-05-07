import { type DatabaseConnection } from "../../database/connection";

export type RemoveBookGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function removeBookGenreCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    bookId: string,
    genreId: string,
  ): Promise<RemoveBookGenreResult> => {
    const relation = await databaseConnection
      .deleteFrom("bookBookGenre")
      .where((eb) =>
        eb.and([
          eb("bookBookGenre.bookId", "=", bookId),
          eb("bookBookGenre.bookGenreId", "=", genreId),
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

export type RemoveBookGenreCommand = ReturnType<
  typeof removeBookGenreCommandFactory
>;
