import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";

export function deleteBookAuthorEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookAuthorId } = request.params as { bookAuthorId: string };

    const result = await bookService.deleteBookAuthorCommand(bookAuthorId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
