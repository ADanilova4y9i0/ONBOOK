import { redirect, type MiddlewareFunction } from "react-router";

import { parseCookie } from "~/common/parse-cookie";
import { authContext } from "~/context/auth.context";

export const authMiddleware = (async ({ context, request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = parseCookie(cookieHeader).token;

  if (typeof token !== "string") {
    context.set(authContext, null);

    throw redirect("/");
  }

  context.set(authContext, {
    token: token,
  });
}) satisfies MiddlewareFunction;
