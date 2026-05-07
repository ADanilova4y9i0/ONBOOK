import { data, type ActionFunctionArgs } from "react-router";

import { createGenre } from "~/api/cms/create-genre";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { name } = await args.request.json();

  const result = await createGenre(auth.token, name);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
