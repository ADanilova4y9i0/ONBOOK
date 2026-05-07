import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";
import { getUserIdFromRequest } from "../../middleware/auth.middleware";

const bodySchema = z.object({
  authorId: z.string(),
});

export function addBookAuthorEndpointFactory(bookService: BookService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookId } = request.params as { bookId: string };

    const userId = getUserIdFromRequest(request);

    if (userId === null) {
      reply.status(401).send();

      return;
    }

    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const result = await bookService.addBookAuthorCommand(
      bookId,
      parsed.data.authorId,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send();
  };
}
