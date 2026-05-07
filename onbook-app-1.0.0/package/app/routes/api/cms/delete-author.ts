import { data, type ActionFunctionArgs } from "react-router";

import { deleteAuthor } from "~/api/cms/delete-author";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { id } = await args.request.json();

  const result = await deleteAuthor(auth.token, id);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
