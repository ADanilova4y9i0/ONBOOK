import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";

export function deleteBookGenreEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookGenreId } = request.params as { bookGenreId: string };

    const result = await bookService.deleteBookGenreCommand(bookGenreId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
