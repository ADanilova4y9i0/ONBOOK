import { fetchServer } from "../constants";

export type EditBookAuthorsResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function editBookAuthors(
  token: string,
  bookId: string,
  toAdd: string[],
  toRemove: string[],
): Promise<EditBookAuthorsResult> {
  const tasks: Promise<unknown>[] = [];

  for (const id of toAdd) {
    const task = fetchServer(`books/${bookId}/authors`, {
      method: "POST",
      body: JSON.stringify({
        authorId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    tasks.push(task);
  }

  for (const id of toRemove) {
    const task = fetchServer(`books/${bookId}/authors`, {
      method: "DELETE",
      body: JSON.stringify({
        authorId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    tasks.push(task);
  }

  await Promise.all(tasks);

  return {
    ok: true,
  };
}
