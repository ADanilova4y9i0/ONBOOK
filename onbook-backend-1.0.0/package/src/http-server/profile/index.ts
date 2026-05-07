import { type FastifyInstance } from "fastify";

import { type UserService } from "../../user";
import { type AuthMiddleware } from "../middleware/auth.middleware";
import { getProfileEndpointFactory } from "./endpoints/get-profile";

export function profileRoute(
  fastify: FastifyInstance,
  userService: UserService,
  authMiddleware: AuthMiddleware,
): void {
  const getProfileHandler = getProfileEndpointFactory(userService);

  fastify.register((plugin) => {
    plugin.addHook("preHandler", authMiddleware);

    plugin.get("/profile", getProfileHandler);
  });
}
