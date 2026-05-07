import { fetchServer } from "../constants";

export type DeleteAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function deleteAuthor(
  token: string,
  id: string,
): Promise<DeleteAuthorResult> {
  const response = await fetchServer(`book-authors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `deleteAuthor response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
