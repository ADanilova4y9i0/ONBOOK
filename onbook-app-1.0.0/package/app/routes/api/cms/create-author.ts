import { data, type ActionFunctionArgs } from "react-router";

import { createAuthor } from "~/api/cms/create-author";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { firstname, lastname, middlename, dateOfBirth, biography, avatar } =
    await args.request.json();

  const result = await createAuthor(auth.token, {
    firstname: firstname,
    lastname: lastname,
    middlename: middlename,
    dateOfBirth: dateOfBirth,
    biography: biography,
    avatar: avatar,
  });

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
