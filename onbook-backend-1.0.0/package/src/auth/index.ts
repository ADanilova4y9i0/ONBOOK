import { type DatabaseConnection } from "../database/connection";
import { comparePasswordCommandFactory } from "./commands/compare-password.command";
import { createUserCommandFactory } from "./commands/create-user-command";
import { generateTokenCommandFactory } from "./commands/generate-token.command";
import { hashPasswordCommandFactory } from "./commands/hash-password.command";
import { signInCommandFactory } from "./commands/sign-in.command";
import {
  type SignUpCommand,
  signUpCommandFactory,
} from "./commands/sign-up.command";
import { verifyTokenCommandFactory } from "./commands/verify-token.command";
import { getUserQueryFactory } from "./query/get-user.query";

export async function bootstrapAuthService(
  databaseConnection: DatabaseConnection,
  passwordHashRounds: number,
  tokenSecret: string,
  tokenExpirationMs: number,
) {
  const hashPasswordCommand = hashPasswordCommandFactory(passwordHashRounds);
  const comparePasswordCommand = comparePasswordCommandFactory();

  const getUserQuery = getUserQueryFactory(databaseConnection);
  const createUserCommand = createUserCommandFactory(
    databaseConnection,
    hashPasswordCommand,
  );

  const generateTokenCommand = generateTokenCommandFactory(
    tokenSecret,
    tokenExpirationMs,
  );
  const verifyTokenCommand = verifyTokenCommandFactory(tokenSecret);

  const signUpCommand = signUpCommandFactory(
    getUserQuery,
    createUserCommand,
    generateTokenCommand,
  );

  const signInCommand = signInCommandFactory(
    getUserQuery,
    comparePasswordCommand,
    generateTokenCommand,
  );

  await createAdminUserIfNotExist(databaseConnection, signUpCommand);

  return {
    signUpCommand: signUpCommand,
    signInCommand: signInCommand,

    verifyTokenCommand: verifyTokenCommand,
  };
}

export type AuthService = Awaited<ReturnType<typeof bootstrapAuthService>>;

const DEFAULT_ADMIN_LOGIN = "root";
const DEFAULT_ADMIN_PASSWORD = "root";

async function createAdminUserIfNotExist(
  databaseConnection: DatabaseConnection,
  signUpCommand: SignUpCommand,
): Promise<void> {
  const signUpResult = await signUpCommand(
    DEFAULT_ADMIN_LOGIN,
    DEFAULT_ADMIN_PASSWORD,
    true,
  );

  if (!signUpResult.ok) {
    return;
  }
}
