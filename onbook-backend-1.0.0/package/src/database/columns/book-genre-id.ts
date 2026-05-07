import { uuid } from "drizzle-orm/pg-core";

export const bookGenreIdColumn = (name: string) => uuid(name);
