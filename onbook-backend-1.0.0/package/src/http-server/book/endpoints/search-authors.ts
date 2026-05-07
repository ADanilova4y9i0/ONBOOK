import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookService } from "../../../book";
import { type AuthorFilter } from "../../../book/query/search-authors.query";

export function searchAuthorsEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = request.query as any;

    const filter: AuthorFilter = {
      name: query.name,
      offset: query.offset ? Number(query.offset) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      orderBy: {
        type: query.orderType || "name",
        order: query.order || "asc",
      },
    };

    const result = await bookService.searchAuthorsQuery(filter);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      authors: result.data.authors,
    });
  };
}
