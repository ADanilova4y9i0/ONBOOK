import { type DatabaseConnection } from "../../database/connection";

type GetUserResult =
  | {
      ok: true;
      data: {
        user: {
          id: string;
          login: string;
          avatar: string | null;
          createdAt: number;
          isAdmin: boolean;
        };
      };
    }
  | {
      ok: false;
    };

export function getUserQueryFactory(databaseConnection: DatabaseConnection) {
  return async (userId: string): Promise<GetUserResult> => {
    const user = await databaseConnection
      .selectFrom("user")
      .select(["user.login", "user.avatar", "user.createdAt", "user.isAdmin"])
      .where("user.id", "=", userId)
      .limit(1)
      .executeTakeFirst();

    if (user === undefined) {
      return {
        ok: false,
      };
    }

    return {
      ok: true,
      data: {
        user: {
          id: userId,
          login: user.login,
          avatar: user.avatar,
          createdAt: user.createdAt.getTime(),
          isAdmin: user.isAdmin,
        },
      },
    };
  };
}
