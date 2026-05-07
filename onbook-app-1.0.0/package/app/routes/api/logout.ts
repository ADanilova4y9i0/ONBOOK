import { type ActionFunctionArgs, data } from "react-router";

import { authContext } from "~/context/auth.context";
import { userContext } from "~/context/user.context";

export async function action(args: ActionFunctionArgs) {
  args.context.set(authContext, null);
  args.context.set(userContext, null);

  return data(
    { success: true },
    {
      headers: {
        "Set-Cookie": "token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
      },
    },
  );
}
