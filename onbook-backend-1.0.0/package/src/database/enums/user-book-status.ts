import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

const values = [
  "to_read",
  "reading",
  "completed",
  "dropped",
  "on_hold",
] as const;

export const userBookStatusEnum = pgEnum("user_book_status_enum", values);

export const userBookStatusSchema = z.enum(values);

export type UserBookStatus = z.infer<typeof userBookStatusSchema>;
