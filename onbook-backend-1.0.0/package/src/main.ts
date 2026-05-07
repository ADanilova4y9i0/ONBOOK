import { config } from "dotenv";
import path from "path";

import { bootstrapAuthService } from "./auth";
import { bootstrapBookService } from "./book";
import { bootstrapBookStatusService } from "./book-status";
import { bootstrapDatabaseConnection } from "./database/connection";
import { startHttpServer } from "./http-server";
import { bootstrapUserService } from "./user";

async function bootstrap(): Promise<void> {
  const envConfigPath = path.join(process.cwd(), ".env");

  config({
    path: envConfigPath,
    quiet: true,
  });

  const host = process.env["HOST"]!;
  const port = Number.parseInt(process.env["PORT"]!);

  const databaseHost = process.env["DATABASE_HOST"]!;
  const databasePort = Number.parseInt(process.env["DATABASE_PORT"]!);
  const databaseUser = process.env["DATABASE_USER"]!;
  const databasePassword = process.env["DATABASE_PASSWORD"]!;
  const databaseName = process.env["DATABASE_NAME"]!;

  const passwordHashRounds = Number.parseInt(
    process.env["PASSWORD_HASH_ROUNDS"]!,
  );

  const tokenSecret = process.env["TOKEN_SECRET"]!;
  const tokenExpirationMs = Number.parseInt(
    process.env["TOKEN_EXPIRATION_MS"]!,
  );

  const databaseConnection = await bootstrapDatabaseConnection(
    databaseName,
    databaseHost,
    databasePort,
    databaseUser,
    databasePassword,
  );

  const authService = await bootstrapAuthService(
    databaseConnection,
    passwordHashRounds,
    tokenSecret,
    tokenExpirationMs,
  );

  const bookService = await bootstrapBookService(databaseConnection);

  const bookStatusService =
    await bootstrapBookStatusService(databaseConnection);

  const userService = await bootstrapUserService(databaseConnection);

  await startHttpServer(
    host,
    port,
    databaseConnection,
    authService,
    userService,
    bookService,
    bookStatusService,
  );
}

void bootstrap();
