import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  middlename: z.string().optional().nullable(),
  dateOfBirth: z.number().min(0).optional(),
  biography: z.string().optional(),
  avatar: z.string().optional().nullable(),
});

export function updateBookAuthorEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const { bookAuthorId } = request.params as { bookAuthorId: string };

    const result = await bookService.updateBookAuthorCommand(
      bookAuthorId,
      parsed.data.firstname,
      parsed.data.lastname,
      parsed.data.middlename,
      parsed.data.dateOfBirth,
      parsed.data.biography,
      parsed.data.avatar,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
