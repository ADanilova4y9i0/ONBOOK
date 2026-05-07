import { type MiddlewareFunction } from "react-router";

import { getProfile } from "~/api/get-profile";
import { parseCookie } from "~/common/parse-cookie";
import { authContext } from "~/context/auth.context";
import { userContext } from "~/context/user.context";

export const userMiddleware = (async ({ context, request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = parseCookie(cookieHeader).token;

  if (typeof token !== "string") {
    context.set(authContext, null);
    context.set(userContext, null);
  } else {
    const getProfileResult = await getProfile(token);

    if (!getProfileResult.ok) {
      context.set(authContext, null);
      context.set(userContext, null);

      return;
    }

    console.log(`userMiddleware`);

    context.set(authContext, {
      token: token,
    });

    context.set(userContext, getProfileResult.data.user);
  }
}) satisfies MiddlewareFunction;
