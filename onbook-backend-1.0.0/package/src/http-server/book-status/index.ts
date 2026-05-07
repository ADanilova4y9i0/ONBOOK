import type { FastifyInstance } from "fastify";

import { type BookStatusService } from "../../book-status";
import { type AuthMiddleware } from "../middleware/auth.middleware";
import { getUserBookStatusEndpointFactory } from "./endpoints/get-book-status";
import { setUserBookStatusEndpointFactory } from "./endpoints/set-book-status";
import { unsetUserBookStatusEndpointFactory } from "./endpoints/unset-book-status";

export function bookStatusRoute(
  fastify: FastifyInstance,
  bookStatusService: BookStatusService,
  authMiddleware: AuthMiddleware,
): void {
  const setUserBookStatusHandler =
    setUserBookStatusEndpointFactory(bookStatusService);

  const getUserBookStatusHandler =
    getUserBookStatusEndpointFactory(bookStatusService);

  const unsetUserBookStatusHandler =
    unsetUserBookStatusEndpointFactory(bookStatusService);

  fastify.register((plugin) => {
    plugin.addHook("preHandler", authMiddleware);

    plugin.patch("/book-status/:bookId", setUserBookStatusHandler);
    plugin.get("/book-status/:bookId", getUserBookStatusHandler);
    plugin.delete("/book-status/:bookId", unsetUserBookStatusHandler);
  });
}
