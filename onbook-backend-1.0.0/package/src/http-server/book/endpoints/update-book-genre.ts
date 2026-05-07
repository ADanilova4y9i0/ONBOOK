import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  name: z.string(),
});

export function updateBookGenreEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const { bookGenreId } = request.params as { bookGenreId: string };

    const result = await bookService.updateBookGenreCommand(
      bookGenreId,
      parsed.data.name,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
