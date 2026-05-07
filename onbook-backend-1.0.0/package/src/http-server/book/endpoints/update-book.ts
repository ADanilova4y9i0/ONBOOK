import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  title: z.string().optional(),
  preview: z.string().optional(),
  description: z.string().optional(),
  attrs: z.record(z.string(), z.string()).optional(),
});

export function updateBookEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const { bookId } = request.params as { bookId: string };

    const result = await bookService.updateBookCommand(
      bookId,
      parsed.data.title,
      parsed.data.description,
      parsed.data.preview,
      parsed.data.attrs,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
