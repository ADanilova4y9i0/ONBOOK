import { fetchServer } from "./constants";

export type GetBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export async function sendFeedback(
  token: string,
  bookId: string,
  comment: string,
  score: number,
): Promise<GetBookResult> {
  const response = await fetchServer(`books/${bookId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify({
      comment: comment,
      score: score,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `sendFeedback response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  return {
    ok: true,
  };
}
