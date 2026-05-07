import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";

const bodySchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  middlename: z.string().optional().nullable(),
  biography: z.string(),
  dateOfBirth: z.number(),
  avatar: z.string().nullable(),
});

export function createBookAuthorEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      console.log(parsed.error);

      reply.status(400);

      return;
    }

    const result = await bookService.createBookAuthorCommand(
      parsed.data.firstname,
      parsed.data.lastname,
      parsed.data.middlename,
      parsed.data.biography,
      new Date(parsed.data.dateOfBirth),
      parsed.data.avatar,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      bookAuthorId: result.data.bookAuthorId,
    });
  };
}
