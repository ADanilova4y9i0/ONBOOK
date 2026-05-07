import { fetchServer } from "../constants";

type CreateAuthorData = {
  firstname: string;
  lastname: string;
  middlename?: string | null;
  dateOfBirth: string;
  biography: string;
  avatar: string;
};

export type CreateAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function createAuthor(
  token: string,
  data: CreateAuthorData,
): Promise<CreateAuthorResult> {
  const response = await fetchServer(`book-authors`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `createAuthor response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
