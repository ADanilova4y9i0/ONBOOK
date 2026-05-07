import {
  pgTable,
  primaryKey,
  timestamp,
  unique,
  text,
  boolean,
} from "drizzle-orm/pg-core";

import { userIdColumn } from "../columns/user-id";
import { uuidv7Default } from "../utils/uuidv7";

export const userTable = pgTable(
  "user",
  {
    id: userIdColumn("id").notNull().default(uuidv7Default),

    login: text("login").notNull(),
    password: text("password").notNull(),

    avatar: text("avatar"),

    isAdmin: boolean("is_admin").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ name: "user_pk", columns: [table.id] }),
    unique("user_login_unique").on(table.login),
  ],
);
