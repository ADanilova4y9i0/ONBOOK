import type { GenerateTokenCommand } from "./generate-token.command";

import { type GetUserQuery } from "../query/get-user.query";
import { type CreateUserCommand } from "./create-user-command";

export type SignUpResult =
  | {
      ok: true;
      data: {
        token: string;
      };
    }
  | {
      ok: false;
      error: "unknown";
    }
  | {
      ok: false;
      error: "user.already-exist";
    };

export function signUpCommandFactory(
  getUserQuery: GetUserQuery,
  createUserCommand: CreateUserCommand,
  generateTokenCommand: GenerateTokenCommand,
) {
  return async (
    login: string,
    password: string,
    isAdmin: boolean = false,
  ): Promise<SignUpResult> => {
    const existUser = await getUserQuery(login);

    if (existUser.ok) {
      return {
        ok: false,
        error: "user.already-exist",
      };
    }

    const createUserResult = await createUserCommand(login, password, isAdmin);

    if (!createUserResult.ok) {
      return createUserResult;
    }

    const generateTokenResult = await generateTokenCommand(
      createUserResult.data.id,
    );

    if (!generateTokenResult.ok) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
      data: {
        token: generateTokenResult.data.token,
      },
    };
  };
}

export type SignUpCommand = ReturnType<typeof signUpCommandFactory>;
