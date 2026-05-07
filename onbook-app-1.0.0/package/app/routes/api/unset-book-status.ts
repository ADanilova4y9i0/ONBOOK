import { data, type ActionFunctionArgs } from "react-router";

import { unsetBookStatus } from "~/api/unset-book-status";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { id } = await args.request.json();

  const result = await unsetBookStatus(auth.token, id);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
