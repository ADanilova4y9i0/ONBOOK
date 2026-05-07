import { type FastifyInstance } from "fastify";

import type { AuthMiddleware } from "../middleware/auth.middleware";

import { type AuthService } from "../../auth";
import { type BookService } from "../../book";
import { type AdminMiddleware } from "../middleware/admin.middleware";
import { addBookAuthorEndpointFactory } from "./endpoints/add-book-author";
import { addBookGenreEndpointFactory } from "./endpoints/add-book-genre";
import { createBookEndpointFactory } from "./endpoints/create-book";
import { createBookAuthorEndpointFactory } from "./endpoints/create-book-author";
import { createBookGenreEndpointFactory } from "./endpoints/create-book-genre";
import { deleteBookEndpointFactory } from "./endpoints/delete-book";
import { deleteBookAuthorEndpointFactory } from "./endpoints/delete-book-author";
import { deleteBookGenreEndpointFactory } from "./endpoints/delete-book-genre";
import { getBookEndpointFactory } from "./endpoints/get-book";
import { getBookAuthorEndpointFactory } from "./endpoints/get-book-author";
import { getBookAuthorsEndpointFactory } from "./endpoints/get-book-authors";
import { getBookFeedbacksEndpointFactory } from "./endpoints/get-book-feedbacks";
import { getBookGenresEndpointFactory } from "./endpoints/get-book-genres";
import { getGenresEndpointFactory } from "./endpoints/get-genres";
import { removeBookAuthorEndpointFactory } from "./endpoints/remove-book-author";
import { removeBookGenreEndpointFactory } from "./endpoints/remove-book-genre";
import { searchAuthorsEndpointFactory } from "./endpoints/search-authors";
import { searchBooksEndpointFactory } from "./endpoints/search-books";
import { sendBookFeedbackEndpointFactory } from "./endpoints/send-book-feedback";
import { updateBookEndpointFactory } from "./endpoints/update-book";
import { updateBookAuthorEndpointFactory } from "./endpoints/update-book-author";
import { updateBookGenreEndpointFactory } from "./endpoints/update-book-genre";

export function booksRoute(
  fastify: FastifyInstance,
  authService: AuthService,
  bookService: BookService,
  authMiddleware: AuthMiddleware,
  adminMiddleware: AdminMiddleware,
): void {
  // common
  const searchBooksHandler = searchBooksEndpointFactory(
    authService,
    bookService,
  );

  // book

  const createBookHandler = createBookEndpointFactory(bookService);

  const getBookGenresHandler = getBookGenresEndpointFactory(bookService);

  const getBookAuthorsHandler = getBookAuthorsEndpointFactory(bookService);

  const getBookHandler = getBookEndpointFactory(bookService);

  const updateBookHandler = updateBookEndpointFactory(bookService);

  const deleteBookHandler = deleteBookEndpointFactory(bookService);

  // book author

  const createBookAuthorHandler = createBookAuthorEndpointFactory(bookService);

  const getBookAuthorHandler = getBookAuthorEndpointFactory(bookService);

  const searchAuthorsHandler = searchAuthorsEndpointFactory(bookService);

  const updateBookAuthorHandler = updateBookAuthorEndpointFactory(bookService);

  const deleteBookAuthorHandler = deleteBookAuthorEndpointFactory(bookService);

  const addBookAuthorHandler = addBookAuthorEndpointFactory(bookService);

  const removeBookAuthorHandler = removeBookAuthorEndpointFactory(bookService);

  // book genre

  const createBookGenreHandler = createBookGenreEndpointFactory(bookService);

  const getGenresHandler = getGenresEndpointFactory(bookService);

  const deleteBookGenreHandler = deleteBookGenreEndpointFactory(bookService);

  const updateBookGenreHandler = updateBookGenreEndpointFactory(bookService);

  const addBookGenreHandler = addBookGenreEndpointFactory(bookService);

  const removeBookGenreHandler = removeBookGenreEndpointFactory(bookService);

  // feedback
  const sendBookFeedbackHandler = sendBookFeedbackEndpointFactory(bookService);

  const getBookFeedbacksHandler = getBookFeedbacksEndpointFactory(bookService);

  fastify.get("/books", searchBooksHandler);
  fastify.get("/book-authors", searchAuthorsHandler);
  fastify.get("/book-authors/:bookAuthorId", getBookAuthorHandler);

  fastify.get("/books/:bookId", getBookHandler);
  fastify.get("/books/:bookId/feedbacks", getBookFeedbacksHandler);
  fastify.get("/books/:bookId/genres", getBookGenresHandler);
  fastify.get("/books/:bookId/authors", getBookAuthorsHandler);

  fastify.get("/book-genres", getGenresHandler);

  fastify.register((plugin) => {
    plugin.addHook("preHandler", authMiddleware);
    plugin.addHook("preHandler", adminMiddleware);

    plugin.post("/books", createBookHandler);
    plugin.patch("/books/:bookId", updateBookHandler);
    plugin.delete("/books/:bookId", deleteBookHandler);

    plugin.post("/books/:bookId/authors", addBookAuthorHandler);
    plugin.delete("/books/:bookId/authors", removeBookAuthorHandler);
    plugin.post("/books/:bookId/genres", addBookGenreHandler);
    plugin.delete("/books/:bookId/genres", removeBookGenreHandler);

    plugin.post("/book-authors", createBookAuthorHandler);
    plugin.delete("/book-authors/:bookAuthorId", deleteBookAuthorHandler);
    plugin.patch("/book-authors/:bookAuthorId", updateBookAuthorHandler);

    plugin.post("/book-genres", createBookGenreHandler);
    plugin.delete("/book-genres/:bookGenreId", deleteBookGenreHandler);
    plugin.patch("/book-genres/:bookGenreId", updateBookGenreHandler);
  });

  fastify.register((plugin) => {
    plugin.addHook("preHandler", authMiddleware);

    plugin.post("/books/:bookId/feedbacks", sendBookFeedbackHandler);
  });
}
