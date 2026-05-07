import z from "zod";

import { fetchServer } from "../constants";

export const GetGenresResultSchema = z.object({
  genres: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type GetGenresResultSchema = z.infer<typeof GetGenresResultSchema>;

export type GetGenresResult =
  | {
      ok: true;
      data: GetGenresResultSchema;
    }
  | {
      ok: false;
    };

export async function getGenres(): Promise<GetGenresResult> {
  const response = await fetchServer(`book-genres`, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `getGenres response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = GetGenresResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(
      `getGenres parse error: ${z.prettifyError(parsedResult.error)}`,
    );

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
