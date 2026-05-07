import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";

import { bookIdColumn } from "../columns/book-id";
import { userIdColumn } from "../columns/user-id";
import { bookTable } from "./book.table";
import { userTable } from "./user.table";

export const bookFeedbackTable = pgTable(
  "book_feedback",
  {
    userId: userIdColumn("user_id").notNull(),

    bookId: bookIdColumn("book_id").notNull(),

    comment: text("comment").notNull(),

    score: integer("score").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({
      name: "book_feedback_pk",
      columns: [table.userId, table.bookId],
    }),
    foreignKey({
      name: "book_feedback_user_id_fk",
      columns: [table.userId],
      foreignColumns: [userTable.id],
    }),
    foreignKey({
      name: "book_feedback_book_id_fk",
      columns: [table.bookId],
      foreignColumns: [bookTable.id],
    }),
  ],
);
