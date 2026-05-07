import {
  pgTable,
  primaryKey,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

import { bookGenreIdColumn } from "../columns/book-genre-id";
import { bookIdColumn } from "../columns/book-id";
import { bookGenreTable } from "./book-genre.table";
import { bookTable } from "./book.table";

export const bookBookGenreTable = pgTable(
  "book_book_genre",
  {
    bookId: bookIdColumn("book_id").notNull(),

    bookGenreId: bookGenreIdColumn("book_genre_id").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({
      name: "book_book_genre_pk",
      columns: [table.bookId, table.bookGenreId],
    }),
    foreignKey({
      name: "book_book_genre_book_id_fk",
      columns: [table.bookId],
      foreignColumns: [bookTable.id],
    }),
    foreignKey({
      name: "book_book_genre_book_genre_id_fk",
      columns: [table.bookGenreId],
      foreignColumns: [bookGenreTable.id],
    }),
  ],
);
