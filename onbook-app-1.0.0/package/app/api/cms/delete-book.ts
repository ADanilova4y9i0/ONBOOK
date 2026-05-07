import { fetchServer } from "../constants";

export type DeleteBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function deleteBook(
  token: string,
  id: string,
): Promise<DeleteBookResult> {
  const response = await fetchServer(`books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `deleteBook response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
