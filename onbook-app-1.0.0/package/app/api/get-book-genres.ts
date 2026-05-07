import z from "zod";

import { fetchServer } from "./constants";

const GetBookGenresResultSchema = z.object({
  genres: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

type GetBookGenresResultSchema = z.infer<typeof GetBookGenresResultSchema>;

export type GetBookGenresResult =
  | {
      ok: true;
      data: GetBookGenresResultSchema;
    }
  | {
      ok: false;
    };

export async function getBookGenres(
  bookId: string,
): Promise<GetBookGenresResult> {
  const response = await fetchServer(`books/${bookId}/genres`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `signIn response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = GetBookGenresResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signIn parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
