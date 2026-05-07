import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  title: z.string(),
  preview: z.string(),
  description: z.string(),
  attrs: z.record(z.string(), z.string()),
});

export function createBookEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const result = await bookService.createBookCommand(
      parsed.data.title,
      parsed.data.description,
      parsed.data.attrs,
      parsed.data.preview,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      bookId: result.data.bookId,
    });
  };
}
