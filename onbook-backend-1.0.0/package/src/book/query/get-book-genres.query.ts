import { type DatabaseConnection } from "../../database/connection";

export type GetBookGenresResult =
  | {
      ok: true;
      data: {
        genres: {
          name: string;
        }[];
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function getBookGenresQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (bookId: string): Promise<GetBookGenresResult> => {
    const genres = await databaseConnection
      .selectFrom("bookBookGenre")
      .innerJoin("bookGenre", "bookBookGenre.bookGenreId", "bookGenre.id")
      .select(["bookGenre.id", "bookGenre.name"])
      .where("bookBookGenre.bookId", "=", bookId)
      .execute();

    return {
      ok: true,
      data: {
        genres: genres,
      },
    };
  };
}

export type GetBookGenresQuery = ReturnType<typeof getBookGenresQueryFactory>;
