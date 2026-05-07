import { type DatabaseConnection } from "../../database/connection";

export type GetUserResult =
  | {
      ok: true;
      data: {
        id: string;
        login: string;
        password: string;
      };
    }
  | {
      ok: false;
      error: "user.not-found";
    };

export function getUserQueryFactory(databaseConnection: DatabaseConnection) {
  return async (login: string): Promise<GetUserResult> => {
    const user = await databaseConnection
      .selectFrom("user")
      .select(["user.id", "user.password"])
      .where("user.login", "=", login)
      .limit(1)
      .executeTakeFirst();

    if (user === undefined) {
      return {
        ok: false,
        error: "user.not-found",
      };
    }

    return {
      ok: true,
      data: {
        id: user.id,
        login: login,
        password: user.password,
      },
    };
  };
}

export type GetUserQuery = ReturnType<typeof getUserQueryFactory>;
