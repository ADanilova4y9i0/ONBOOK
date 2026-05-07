import { type DatabaseConnection } from "../../database/connection";

export type GetGenresResult =
  | {
      ok: true;
      data: {
        genres: {
          id: string;
          name: string;
        }[];
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function getGenresQueryFactory(databaseConnection: DatabaseConnection) {
  return async (): Promise<GetGenresResult> => {
    const genres = await databaseConnection
      .selectFrom("bookGenre")
      .select(["bookGenre.id", "bookGenre.name"])
      .execute();

    return {
      ok: true,
      data: {
        genres: genres,
      },
    };
  };
}

export type GetGenresQuery = ReturnType<typeof getGenresQueryFactory>;
