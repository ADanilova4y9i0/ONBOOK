import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type BookStatusService } from "../../../book-status";
import { userBookStatusSchema } from "../../../database/enums/user-book-status";
import { getUserIdFromRequest } from "../../middleware/auth.middleware";

const bodySchema = z.object({
  status: userBookStatusSchema,
});

export function setUserBookStatusEndpointFactory(
  bookStatusService: BookStatusService,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const { bookId } = request.params as { bookId: string };

    const userId = getUserIdFromRequest(request);

    if (userId === null) {
      reply.status(401).send();

      return;
    }

    const result = await bookStatusService.setBookStatusCommand(
      userId,
      bookId,
      parsed.data.status,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200);
  };
}
