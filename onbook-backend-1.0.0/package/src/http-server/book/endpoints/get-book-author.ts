import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";

export function getBookAuthorEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookAuthorId } = request.params as { bookAuthorId: string };

    const result = await bookService.getBookAuthor(bookAuthorId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      author: result.data.author,
    });
  };
}
