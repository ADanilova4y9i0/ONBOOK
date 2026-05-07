import { type DatabaseConnection } from "../../database/connection";

export type CreateBookGenreResult =
  | {
      ok: true;
      data: {
        bookGenreId: string;
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function createBookGenreCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    name: string,
    avatar?: string,
  ): Promise<CreateBookGenreResult> => {
    const bookGenre = await databaseConnection
      .insertInto("bookGenre")
      .values({
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
      data: {
        bookGenreId: bookGenre.id,
      },
    };
  };
}

export type CreateBookGenreCommand = ReturnType<
  typeof createBookGenreCommandFactory
>;
