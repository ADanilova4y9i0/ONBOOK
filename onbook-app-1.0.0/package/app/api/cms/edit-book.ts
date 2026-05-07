import { fetchServer } from "../constants";

type EditBookData = {
  title: string;
  description: string;
  attrs: {
    ageLimit: string;
    siteReleaseDate: string;
    writingDate: string;
    volume: string;
    copyrightHolder: string;
  };
  preview: string;
};

export type EditBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };
export async function editBook(
  token: string,
  id: string,
  data: EditBookData,
): Promise<EditBookResult> {
  const response = await fetchServer(`books/${id}`, {
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
