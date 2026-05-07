import { fetchServer } from "../constants";

export type EditAuthorData = {
  firstname: string;
  lastname: string;
  middlename: string;
  dateOfBirth: string;
  biography: string;
  avatar: string;
};

export type EditAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function editAuthor(
  token: string,
  id: string,
  data: EditAuthorData,
): Promise<EditAuthorResult> {
  console.log(JSON.stringify(data));

  const response = await fetchServer(`book-authors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `editAuthor response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
