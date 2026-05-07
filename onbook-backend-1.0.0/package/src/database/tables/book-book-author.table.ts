import {
  pgTable,
  primaryKey,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

import { bookAuthorIdColumn } from "../columns/book-author-id";
import { bookIdColumn } from "../columns/book-id";
import { bookAuthorTable } from "./book-author.table";
import { bookTable } from "./book.table";

export const bookBookAuthorTable = pgTable(
  "book_book_author",
  {
    bookId: bookIdColumn("book_id").notNull(),

    bookAuthorId: bookAuthorIdColumn("book_author_id").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({
      name: "book_book_author_pk",
      columns: [table.bookId, table.bookAuthorId],
    }),
    foreignKey({
      name: "book_book_author_book_id_fk",
      columns: [table.bookId],
      foreignColumns: [bookTable.id],
    }),
    foreignKey({
      name: "book_book_author_book_author_id_fk",
      columns: [table.bookAuthorId],
      foreignColumns: [bookAuthorTable.id],
    }),
  ],
);
