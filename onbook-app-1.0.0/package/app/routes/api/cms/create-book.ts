import { data, type ActionFunctionArgs } from "react-router";

import { createBook } from "~/api/cms/create-book";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const input = await args.request.json();

  const result = await createBook(auth.token, {
    title: input.data.title,
    description: input.data.description,
    attrs: {
      ageLimit: input.data.ageLimit,
      siteReleaseDate: input.data.siteReleaseDate,
      writingDate: input.data.writingDate,
      volume: input.data.volume,
      copyrightHolder: input.data.copyrightHolder,
    },
    preview: input.data.preview,
  });

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
