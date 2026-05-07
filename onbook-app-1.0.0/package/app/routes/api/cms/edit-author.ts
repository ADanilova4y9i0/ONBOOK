import { data, type ActionFunctionArgs } from "react-router";

import { editAuthor } from "~/api/cms/edit-author";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const input = await args.request.json();

  const result = await editAuthor(auth.token, input.id, {
    firstname: input.data.firstname,
    lastname: input.data.lastname,
    middlename: input.data.middlename,
    dateOfBirth: input.data.dateOfBirth,
    biography: input.data.biography,
    avatar: input.data.avatar,
  });

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
