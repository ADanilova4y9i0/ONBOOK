import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";

export function getGenresEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await bookService.getGenresQuery();

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      genres: result.data.genres,
    });
  };
}
