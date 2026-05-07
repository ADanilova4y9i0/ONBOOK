import cors from "@fastify/cors";
import { fastify } from "fastify";

import { type AuthService } from "../auth";
import { type BookService } from "../book";
import { type BookStatusService } from "../book-status";
import { type DatabaseConnection } from "../database/connection";
import { type UserService } from "../user";
import { authRoute } from "./auth";
import { booksRoute } from "./book";
import { bookStatusRoute } from "./book-status";
import { adminMiddlewareFactory } from "./middleware/admin.middleware";
import { authMiddlewareFactory } from "./middleware/auth.middleware";
import { profileRoute } from "./profile";

export async function startHttpServer(
  host: string,
  port: number,
  databaseConnection: DatabaseConnection,
  authService: AuthService,
  userService: UserService,
  bookService: BookService,
  bookStatusService: BookStatusService,
): Promise<void> {
  const server = fastify({
    logger: true,
  });

  await server.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  const authMiddleware = authMiddlewareFactory(authService);
  const adminMiddleware = adminMiddlewareFactory(databaseConnection);

  server.get("/ping", (_, reply) => {
    reply.status(200).send("pong");
  });

  authRoute(server, authService);

  profileRoute(server, userService, authMiddleware);

  booksRoute(server, authService, bookService, authMiddleware, adminMiddleware);

  bookStatusRoute(server, bookStatusService, authMiddleware);

  await server.listen({
    host: host,
    port: port,
  });
}
