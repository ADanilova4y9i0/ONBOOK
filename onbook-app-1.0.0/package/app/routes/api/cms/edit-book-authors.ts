import { data, type ActionFunctionArgs } from "react-router";

import { editBookAuthors } from "~/api/cms/edit-book-authors";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const input = await args.request.json();

  const result = await editBookAuthors(
    auth.token,
    input.bookId,
    input.toAdd,
    input.toRemove,
  );

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
