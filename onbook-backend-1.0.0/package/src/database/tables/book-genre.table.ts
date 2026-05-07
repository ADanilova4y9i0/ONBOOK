import { pgTable, primaryKey, timestamp, text } from "drizzle-orm/pg-core";

import { bookGenreIdColumn } from "../columns/book-genre-id";
import { uuidv7Default } from "../utils/uuidv7";

export const bookGenreTable = pgTable(
  "book_genre",
  {
    id: bookGenreIdColumn("id").notNull().default(uuidv7Default),

    name: text("name").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ name: "book_genre_pk", columns: [table.id] })],
);
