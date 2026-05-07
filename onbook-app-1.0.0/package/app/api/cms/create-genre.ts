import { fetchServer } from "../constants";

export type CreateGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function createGenre(
  token: string,
  name: string,
): Promise<CreateGenreResult> {
  const response = await fetchServer(`book-genres`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `createGenre response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
