import { fetchServer } from "../constants";

export type EditBookGenresResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function editBookGenres(
  token: string,
  bookId: string,
  toAdd: string[],
  toRemove: string[],
): Promise<EditBookGenresResult> {
  const tasks: Promise<unknown>[] = [];

  for (const genreId of toAdd) {
    const task = fetchServer(`books/${bookId}/genres`, {
      method: "POST",
      body: JSON.stringify({
        genreId: genreId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    tasks.push(task);
  }

  for (const genreId of toRemove) {
    const task = fetchServer(`books/${bookId}/genres`, {
      method: "DELETE",
      body: JSON.stringify({
        genreId: genreId,
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
