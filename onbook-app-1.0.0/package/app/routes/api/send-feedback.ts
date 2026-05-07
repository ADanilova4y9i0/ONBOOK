import { type ActionFunctionArgs, data } from "react-router";

import { sendFeedback } from "~/api/send-feedback";
import { authContext } from "~/context/auth.context";

export async function action(args: ActionFunctionArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return;
  }

  const { bookId, comment, score } = await args.request.json();

  const result = await sendFeedback(auth.token, bookId, comment, score);

  if (!result.ok) {
    return;
  }

  return data({ success: true }, {});
}
