import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";

export function getBookEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookId } = request.params as { bookId: string };

    const result = await bookService.getBookQuery(bookId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      book: result.data.book,
    });
  };
}
