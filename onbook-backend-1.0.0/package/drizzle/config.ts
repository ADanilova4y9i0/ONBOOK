import { defineConfig } from "drizzle-kit";

import { migrationsFolder, sqlSchemaPath } from "./common";
import { dbCredentials } from "./creds";

export default defineConfig({
  out: migrationsFolder,
  schema: [sqlSchemaPath],
  dialect: "postgresql",
  dbCredentials: dbCredentials,
});
