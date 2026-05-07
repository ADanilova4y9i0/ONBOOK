import "./inject-env";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import { migrationsFolder } from "./common";
import { dbCredentials } from "./creds";

try {
  console.log("Migration start");

  console.log(dbCredentials);

  const pool = new Pool({
    ...dbCredentials,
    max: 1,
  });

  const db = drizzle({ client: pool, logger: true });

  await migrate(db, {
    migrationsFolder: migrationsFolder,
    migrationsSchema: "public",
    migrationsTable: "__migrations",
  });

  console.log("Migration up done");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
