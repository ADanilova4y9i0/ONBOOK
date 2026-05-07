import { uuid } from "drizzle-orm/pg-core";

export const bookIdColumn = (name: string) => uuid(name);
