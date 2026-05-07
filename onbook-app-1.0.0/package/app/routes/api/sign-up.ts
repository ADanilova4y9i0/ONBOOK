import { type ActionFunctionArgs, data } from "react-router";

import { signUp } from "~/api/auth";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const { login, password } = await args.request.json();

  const result = await signUp(login, password);

  if (!result.ok) {
    return;
  }

  args.context.set(authContext, {
    token: result.data.token,
  });

  return data(
    { success: true },
    {
      headers: {
        "Set-Cookie": `token=${result.data.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
      },
    },
  );
}
