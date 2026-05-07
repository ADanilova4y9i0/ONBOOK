import { sql } from "drizzle-orm";

export const uuidv7Default = sql`uuid_generate_v7()`;
