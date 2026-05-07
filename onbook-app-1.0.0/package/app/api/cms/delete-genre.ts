import type { CreateGenreResult } from "./create-genre";

import { fetchServer } from "../constants";

export type DeleteGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function deleteGenre(
  token: string,
  id: string,
): Promise<CreateGenreResult> {
  const response = await fetchServer(`book-genres/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `deleteGenre response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
