import { data, type ActionFunctionArgs } from "react-router";

import { deleteBook } from "~/api/cms/delete-book";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { id } = await args.request.json();

  const result = await deleteBook(auth.token, id);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
