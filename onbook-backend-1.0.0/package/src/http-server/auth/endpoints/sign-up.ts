import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type AuthService } from "../../../auth";

const signUpBodySchema = z.object({
  login: z.string(),
  password: z.string(),
});

export function signUpEndpointFactory(authService: AuthService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = signUpBodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const result = await authService.signUpCommand(
      parsed.data.login,
      parsed.data.password,
    );

    if (!result.ok) {
      reply.status(400);

      return;
    }

    reply.status(200).send({
      token: result.data.token,
    });
  };
}
