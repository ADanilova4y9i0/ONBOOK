import { fetchServer } from "../constants";

export type EditGenreResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function editGenre(
  token: string,
  id: string,
  name?: string,
): Promise<EditGenreResult> {
  const response = await fetchServer(`book-genres/${id}`, {
    method: "PATCH",
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
