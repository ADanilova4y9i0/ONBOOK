import { data, type ActionFunctionArgs } from "react-router";

import { setBookStatus } from "~/api/set-book-status";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { id, status } = await args.request.json();

  const result = await setBookStatus(auth.token, id, status);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
