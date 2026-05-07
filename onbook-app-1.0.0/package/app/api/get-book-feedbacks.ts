import z from "zod";

import { fetchServer } from "./constants";

const GetBookFeedBacksResultSchema = z.object({
  feedbacks: z.array(
    z.object({
      user: z.object({
        login: z.string(),
        avatar: z.string().nullable(),
      }),
      comment: z.string(),
      score: z.number(),
      createdAt: z.number(),
    }),
  ),
});

type GetBookFeedBacksResultSchema = z.infer<
  typeof GetBookFeedBacksResultSchema
>;

export type GetBookFeedbacksResult =
  | {
      ok: true;
      data: GetBookFeedBacksResultSchema;
    }
  | {
      ok: false;
    };

export async function getBookFeedbacks(
  bookId: string,
): Promise<GetBookFeedbacksResult> {
  const response = await fetchServer(`books/${bookId}/feedbacks`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `signIn response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = GetBookFeedBacksResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signIn parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
