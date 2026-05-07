import { type bookAuthorTable } from "./tables/book-author.table";
import { type bookBookAuthorTable } from "./tables/book-book-author.table";
import { type bookBookGenreTable } from "./tables/book-book-genre.table";
import { type bookFeedbackTable } from "./tables/book-feedback.table";
import { type bookGenreTable } from "./tables/book-genre.table";
import { type bookTable } from "./tables/book.table";
import { type userBookStatusTable } from "./tables/user-book-status.table";
import { type userTable } from "./tables/user.table";
import { type KyselifyTable } from "./types";

export type UserTable = KyselifyTable<typeof userTable>;

export type BookTable = KyselifyTable<typeof bookTable>;

export type BookAuthorTable = KyselifyTable<typeof bookAuthorTable>;

export type BookGenreTable = KyselifyTable<typeof bookGenreTable>;

export type BookBookAuthorTable = KyselifyTable<typeof bookBookAuthorTable>;

export type BookBookGenreTable = KyselifyTable<typeof bookBookGenreTable>;

export type BookFeedbackTable = KyselifyTable<typeof bookFeedbackTable>;

export type UserBookStatusTable = KyselifyTable<typeof userBookStatusTable>;

export type Database = {
  user: UserTable;
  book: BookTable;
  bookAuthor: BookAuthorTable;
  bookGenre: BookGenreTable;
  bookBookAuthor: BookBookAuthorTable;
  bookBookGenre: BookBookGenreTable;
  bookFeedback: BookFeedbackTable;
  userBookStatus: UserBookStatusTable;
};
