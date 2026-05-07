import { type FastifyReply, type FastifyRequest } from "fastify";

import { type DatabaseConnection } from "../../database/connection";
import { getUserIdFromRequest } from "./auth.middleware";

export function adminMiddlewareFactory(databaseConnection: DatabaseConnection) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = getUserIdFromRequest(request);

    if (userId === null) {
      reply.status(401).send();

      return;
    }

    const user = await databaseConnection
      .selectFrom("user")
      .select("user.isAdmin")
      .where("user.id", "=", userId)
      .limit(1)
      .executeTakeFirst();

    if (user === undefined) {
      reply.status(400).send();

      return;
    }

    if (!user.isAdmin) {
      reply.status(400).send();

      return;
    }
  };
}

export type AdminMiddleware = ReturnType<typeof adminMiddlewareFactory>;
