import type { FastifyRequest, FastifyReply } from "fastify";

import { type BookStatusService } from "../../../book-status";
import { getUserIdFromRequest } from "../../middleware/auth.middleware";

export function getUserBookStatusEndpointFactory(
  bookStatusService: BookStatusService,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookId } = request.params as { bookId: string };

    const userId = getUserIdFromRequest(request);

    if (userId === null) {
      reply.status(401).send();

      return;
    }

    const result = await bookStatusService.getBookStatusQuery(userId, bookId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      status: result.data.status,
    });
  };
}
