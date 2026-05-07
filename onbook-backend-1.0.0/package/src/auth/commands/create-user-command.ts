import { type DatabaseConnection } from "../../database/connection";
import { type HashPasswordCommand } from "./hash-password.command";

export type CreateUserResult =
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
      error: "unknown";
    };

export function createUserCommandFactory(
  databaseConnection: DatabaseConnection,
  hashPasswordCommand: HashPasswordCommand,
) {
  return async (
    login: string,
    password: string,
    isAdmin: boolean,
  ): Promise<CreateUserResult> => {
    const hashPasswordResult = await hashPasswordCommand(password);

    if (!hashPasswordResult.ok) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    const user = await databaseConnection
      .insertInto("user")
      .values({
        login: login,
        password: hashPasswordResult.data.hash,
        isAdmin: isAdmin,
      })
      .returning(["user.id"])
      .executeTakeFirst();

    if (user === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
      data: {
        id: user.id,
        login: login,
        password: hashPasswordResult.data.hash,
      },
    };
  };
}

export type CreateUserCommand = ReturnType<typeof createUserCommandFactory>;
