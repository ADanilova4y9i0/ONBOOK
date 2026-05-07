import { pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";

import { bookIdColumn } from "../columns/book-id";
import { userIdColumn } from "../columns/user-id";
import { userBookStatusEnum } from "../enums/user-book-status";

export const userBookStatusTable = pgTable(
  "user_book_status",
  {
    userId: userIdColumn("user_id").notNull(),

    bookId: bookIdColumn("book_id").notNull(),

    status: userBookStatusEnum("status").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({
      name: "user_book_status_pk",
      columns: [table.userId, table.bookId],
    }),
  ],
);
