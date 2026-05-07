import { pgTable, primaryKey, timestamp, text } from "drizzle-orm/pg-core";

import { bookAuthorIdColumn } from "../columns/book-author-id";
import { uuidv7Default } from "../utils/uuidv7";

export const bookAuthorTable = pgTable(
  "book_author",
  {
    id: bookAuthorIdColumn("id").notNull().default(uuidv7Default),

    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    middlename: text("middlename"),

    dateOfBirth: timestamp("date_of_birth", { withTimezone: true }).notNull(),

    biography: text("biography").notNull(),

    avatar: text("avatar"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ name: "book_author_pk", columns: [table.id] })],
);
