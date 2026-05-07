import z from "zod";

export const userBookStatusSchema = z.enum([
  "to_read",
  "reading",
  "completed",
  "dropped",
  "on_hold",
]);

export type UserBookStatus = z.infer<typeof userBookStatusSchema>;
