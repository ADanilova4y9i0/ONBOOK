import type { FastifyRequest, FastifyReply } from "fastify";

import { type UserService } from "../../../user";
import { getUserIdFromRequest } from "../../middleware/auth.middleware";

export function getProfileEndpointFactory(userService: UserService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = getUserIdFromRequest(request);

    if (userId === null) {
      reply.send(401);

      return;
    }

    const result = await userService.getUserQuery(userId);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      user: result.data.user,
    });
  };
}
