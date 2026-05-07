import z from "zod";

import { fetchServer } from "./constants";

const getBookResultSchema = z.object({
  authors: z.array(
    z.object({
      id: z.string(),
      firstname: z.string(),
      lastname: z.string(),
      middlename: z.string().nullable(),
    }),
  ),
});

type GetBookResult = z.infer<typeof getBookResultSchema>;

export type GetBookAuthorsResult =
  | {
      ok: true;
      data: GetBookResult;
    }
  | {
      ok: false;
    };

export async function getBookAuthors(
  bookId: string,
): Promise<GetBookAuthorsResult> {
  const response = await fetchServer(`books/${bookId}/authors`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `signIn response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = getBookResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signIn parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
