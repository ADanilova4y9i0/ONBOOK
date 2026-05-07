import z from "zod";

import { fetchServer } from "./constants";

const GetBookResultSchema = z.object({
  book: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    attrs: z.record(z.string(), z.string()),
    preview: z.string().nullable(),
    averageRating: z.number(),
  }),
});

type GetBookResultSchema = z.infer<typeof GetBookResultSchema>;

export type GetBookResult =
  | {
      ok: true;
      data: GetBookResultSchema;
    }
  | {
      ok: false;
    };

export async function getBook(bookId: string): Promise<GetBookResult> {
  const response = await fetchServer(`books/${bookId}`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `signIn response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = GetBookResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signIn parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
