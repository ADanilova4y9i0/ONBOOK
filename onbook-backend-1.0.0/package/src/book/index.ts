import { type DatabaseConnection } from "../database/connection";
import { addBookAuthorCommandFactory } from "./commands/add-book-author.command";
import { addBookGenreCommandFactory } from "./commands/add-book-genre.command";
import { createBookAuthorCommandFactory } from "./commands/create-book-author.command";
import { createBookGenreCommandFactory } from "./commands/create-book-genre.command";
import { createBookCommandFactory } from "./commands/create-book.command";
import { createFeedbackCommandFactory } from "./commands/create-feedback.command";
import { deleteBookAuthorCommandFactory } from "./commands/delete-book-author.command";
import { deleteBookGenreCommandFactory } from "./commands/delete-book-genre.command";
import { deleteBookCommandFactory } from "./commands/delete-book.command";
import { removeBookAuthorCommandFactory } from "./commands/remove-book-author.command";
import { removeBookGenreCommandFactory } from "./commands/remove-book-genre.command";
import { updateBookAuthorCommandFactory } from "./commands/update-book-author.command";
import { updateBookGenreCommandFactory } from "./commands/update-book-genre.command";
import { updateBookCommandFactory } from "./commands/update-book.command";
import { getBookAuthorQueryFactory } from "./query/get-book-author.query";
import { getBookAuthorsQueryFactory } from "./query/get-book-authors.query";
import { getBookFeedbacksQueryFactory } from "./query/get-book-feedbacks.query";
import { getBookGenresQueryFactory } from "./query/get-book-genres.query";
import { getBookQueryFactory } from "./query/get-book.query";
import { getGenresQueryFactory } from "./query/get-genres.query";
import { searchAuthorsQueryFactory } from "./query/search-authors.query";
import { searchBookQueryFactory } from "./query/search-book.query";

export async function bootstrapBookService(
  databaseConnection: DatabaseConnection,
) {
  // common
  const searchBookQuery = searchBookQueryFactory(databaseConnection);

  // book
  const getBookQuery = getBookQueryFactory(databaseConnection);

  const createBookCommand = createBookCommandFactory(databaseConnection);

  const deleteBookCommand = deleteBookCommandFactory(databaseConnection);

  const updateBookCommand = updateBookCommandFactory(databaseConnection);

  // book author
  const createBookAuthorCommand =
    createBookAuthorCommandFactory(databaseConnection);

  const getBookAuthor = getBookAuthorQueryFactory(databaseConnection);

  const searchAuthorsQuery = searchAuthorsQueryFactory(databaseConnection);

  const updateBookAuthorCommand =
    updateBookAuthorCommandFactory(databaseConnection);

  const deleteBookAuthorCommand =
    deleteBookAuthorCommandFactory(databaseConnection);

  const addBookAuthorCommand = addBookAuthorCommandFactory(databaseConnection);

  const getBookAuthorsQuery = getBookAuthorsQueryFactory(databaseConnection);

  const removeBookAuthorCommand =
    removeBookAuthorCommandFactory(databaseConnection);

  // book genre

  const createBookGenreCommand =
    createBookGenreCommandFactory(databaseConnection);

  const updateBookGenreCommand =
    updateBookGenreCommandFactory(databaseConnection);

  const deleteBookGenreCommand =
    deleteBookGenreCommandFactory(databaseConnection);

  const getGenresQuery = getGenresQueryFactory(databaseConnection);

  const addBookGenreCommand = addBookGenreCommandFactory(databaseConnection);

  const getBookGenresQuery = getBookGenresQueryFactory(databaseConnection);

  const removeBookGenreCommand =
    removeBookGenreCommandFactory(databaseConnection);

  // feedback
  const createFeedbackCommand =
    createFeedbackCommandFactory(databaseConnection);

  const getBookFeedbacksQuery =
    getBookFeedbacksQueryFactory(databaseConnection);

  return {
    // common
    searchBookQuery: searchBookQuery,

    // book
    createBookCommand: createBookCommand,

    getBookQuery: getBookQuery,

    deleteBookCommand: deleteBookCommand,

    updateBookCommand: updateBookCommand,

    // book author
    createBookAuthorCommand: createBookAuthorCommand,

    getBookAuthor: getBookAuthor,
    searchAuthorsQuery: searchAuthorsQuery,

    updateBookAuthorCommand: updateBookAuthorCommand,

    deleteBookAuthorCommand: deleteBookAuthorCommand,

    addBookAuthorCommand: addBookAuthorCommand,
    getBookAuthorsQuery: getBookAuthorsQuery,
    removeBookAuthorCommand: removeBookAuthorCommand,

    // book genre
    createBookGenreCommand: createBookGenreCommand,

    getGenresQuery: getGenresQuery,

    updateBookGenreCommand: updateBookGenreCommand,

    deleteBookGenreCommand: deleteBookGenreCommand,

    addBookGenreCommand: addBookGenreCommand,
    getBookGenresQuery: getBookGenresQuery,
    removeBookGenreCommand: removeBookGenreCommand,

    // feedback
    createFeedbackCommand: createFeedbackCommand,
    getBookFeedbacksQuery: getBookFeedbacksQuery,
  };
}
export type BookService = Awaited<ReturnType<typeof bootstrapBookService>>;
