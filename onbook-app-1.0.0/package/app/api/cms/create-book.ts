import { fetchServer } from "../constants";

type CreateBookData = {
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

export type CreateBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function createBook(
  token: string,
  data: CreateBookData,
): Promise<CreateBookResult> {
  console.log(data);

  const response = await fetchServer(`books`, {
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
