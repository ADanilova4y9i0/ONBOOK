import { type GetUserQuery } from "../query/get-user.query";
import { type ComparePasswordCommand } from "./compare-password.command";
import { type GenerateTokenCommand } from "./generate-token.command";

export type SignInResult =
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
      error: "user.not-found";
    }
  | {
      ok: false;
      error: "user.password-not-match";
    };

export function signInCommandFactory(
  getUserQuery: GetUserQuery,
  comparePasswordCommand: ComparePasswordCommand,
  generateTokenCommand: GenerateTokenCommand,
) {
  return async (login: string, password: string): Promise<SignInResult> => {
    const getUserResult = await getUserQuery(login);

    if (!getUserResult.ok) {
      return getUserResult;
    }

    const comparePasswordResult = await comparePasswordCommand(
      getUserResult.data.password,
      password,
    );

    if (!comparePasswordResult.ok) {
      return {
        ok: false,
        error: "user.password-not-match",
      };
    }

    const generateTokenResult = await generateTokenCommand(
      getUserResult.data.id,
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

export type SignInCommand = ReturnType<typeof signInCommandFactory>;
