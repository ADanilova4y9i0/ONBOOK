import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";

import { type Database } from "./database";

export type DatabaseConnection = Kysely<Database>;

export async function bootstrapDatabaseConnection(
  name: string,
  host: string,
  port: number,
  user: string,
  password: string,
): Promise<DatabaseConnection> {
  const databaseConnection = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: name,
        host: host,
        port: port,
        user: user,
        password: password,

        max: 10,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  await checkConnection(databaseConnection);

  return databaseConnection;
}

async function checkConnection(
  databaseConnection: DatabaseConnection,
): Promise<void> {
  try {
    await sql`SELECT 1`.execute(databaseConnection);

    console.debug("database connection estabilished");
  } catch (error) {
    console.error({ error: error }, "error while connecto to database");

    process.exit(1);
  }
}
