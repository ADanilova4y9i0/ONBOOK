import { config } from "dotenv";
import path from "path";

const envConfigPath = path.join(process.cwd(), ".env");

config({
  path: envConfigPath,
});
