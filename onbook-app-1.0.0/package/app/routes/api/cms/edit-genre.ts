import { data, type ActionFunctionArgs } from "react-router";

import { editGenre } from "~/api/cms/edit-genre";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { id, name } = await args.request.json();

  const result = await editGenre(auth.token, id, name);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
