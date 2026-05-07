import { type FastifyReply, type FastifyRequest } from "fastify";

import { type AuthService } from "../../auth";

function populateRequest(request: FastifyRequest, userId: string): void {
  (request as unknown as Record<string, unknown>)["userId"] = userId;
}

export function getUserIdFromRequest(request: FastifyRequest): string | null {
  const mutableRequest = request as unknown as Record<string, unknown>;

  if (!("userId" in mutableRequest)) {
    return null;
  }

  const rawUserId = mutableRequest["userId"];

  if (typeof rawUserId !== "string") {
    return null;
  }

  return rawUserId;
}

export function authMiddlewareFactory(authService: AuthService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.headers.authorization === undefined) {
      console.error("authorization header not provided");

      reply.status(401).send();

      return;
    }

    const authorizationHeaderParts = request.headers.authorization.split(" ");

    if (authorizationHeaderParts.length !== 2) {
      console.error(
        `invalid authorization header: ${request.headers.authorization}`,
      );

      reply.status(401).send();

      return;
    }

    if (authorizationHeaderParts[0] !== "Bearer") {
      console.error(
        `invalid authorization header type: ${authorizationHeaderParts[0]}`,
      );

      reply.status(401).send();

      return;
    }

    const token = authorizationHeaderParts[1];

    const verifyTokenResult = await authService.verifyTokenCommand(token);

    if (!verifyTokenResult.ok) {
      console.error(`invalid authorization token`);

      reply.status(401).send();

      return;
    }

    populateRequest(request, verifyTokenResult.data.userId);
  };
}

export type AuthMiddleware = ReturnType<typeof authMiddlewareFactory>;
