import {
  pgTable,
  primaryKey,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

import { bookIdColumn } from "../columns/book-id";
import { uuidv7Default } from "../utils/uuidv7";

export const bookTable = pgTable(
  "book",
  {
    id: bookIdColumn("id").notNull().default(uuidv7Default),

    title: text("title").notNull(),

    description: text("description").notNull(),

    attrs: jsonb("attrs").notNull().$type<Record<string, string>>(),

    preview: text("preview"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ name: "book_pk", columns: [table.id] })],
);
