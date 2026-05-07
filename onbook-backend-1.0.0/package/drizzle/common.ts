import path from "path";
import process from "process";

const root = process.cwd();

export const migrationsFolder = path.join("migrations");
export const sqlSchemaPath = path
  .resolve(root, "src", "database", "**", "*.ts")
  .replace(/\\/g, "/");
