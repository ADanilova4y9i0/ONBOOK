import type { UserBookStatus } from "~/common/user-book-status";

import { fetchServer } from "./constants";

export type SetBookStatusResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function setBookStatus(
  token: string,
  id: string,
  status: UserBookStatus,
): Promise<SetBookStatusResult> {
  const response = await fetchServer(`book-status/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
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
