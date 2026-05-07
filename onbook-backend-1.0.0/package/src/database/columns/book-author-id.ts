import { uuid } from "drizzle-orm/pg-core";

export const bookAuthorIdColumn = (name: string) => uuid(name);
