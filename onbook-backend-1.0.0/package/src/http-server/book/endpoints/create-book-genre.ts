import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
});

export function createBookGenreEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const result = await bookService.createBookGenreCommand(
      parsed.data.name,
      parsed.data.avatar,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      bookGenreId: result.data.bookGenreId,
    });
  };
}
