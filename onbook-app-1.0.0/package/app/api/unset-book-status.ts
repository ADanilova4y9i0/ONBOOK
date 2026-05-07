import { fetchServer } from "./constants";

export type UnsetBookStatusResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function unsetBookStatus(
  token: string,
  id: string,
): Promise<UnsetBookStatusResult> {
  const response = await fetchServer(`book-status/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `setBookStatus response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
