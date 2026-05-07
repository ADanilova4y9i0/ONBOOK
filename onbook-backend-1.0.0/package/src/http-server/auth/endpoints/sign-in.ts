import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { type AuthService } from "../../../auth";

const bodySchema = z.object({
  login: z.string(),
  password: z.string(),
});

export function signInEndpointFactory(authService: AuthService) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = bodySchema.safeParse(request.body);

    if (!parsed.success) {
      reply.status(400);

      return;
    }

    const result = await authService.signInCommand(
      parsed.data.login,
      parsed.data.password,
    );

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      token: result.data.token,
    });
  };
}
