import { type FastifyInstance } from "fastify";

import { type AuthService } from "../../auth";
import { signInEndpointFactory } from "./endpoints/sign-in";
import { signUpEndpointFactory } from "./endpoints/sign-up";

export function authRoute(
  fastify: FastifyInstance,
  authService: AuthService,
): void {
  const signUpHandler = signUpEndpointFactory(authService);
  const signInHandler = signInEndpointFactory(authService);

  fastify.post("/auth/sign-up", signUpHandler);
  fastify.post("/auth/sign-in", signInHandler);
}
