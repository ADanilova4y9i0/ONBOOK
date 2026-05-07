import { data, type ActionFunctionArgs } from "react-router";

import { editBook } from "~/api/cms/edit-book";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const input = await args.request.json();

  const result = await editBook(auth.token, input.id, input.data);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
