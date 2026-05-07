import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookService } from "../../../book";
import { getUserIdFromRequest } from "../../middleware/auth.middleware";

const bodySchema = z.object({
  comment: z.string(),
  score: z.int().min(0).max(5),
});

export function sendBookFeedbackEndpointFactory(bookService: BookService) {
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

    const result = await bookService.createFeedbackCommand(
      bookId,
      userId,
      parsed.data.comment,
      parsed.data.score,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send();
  };
}
