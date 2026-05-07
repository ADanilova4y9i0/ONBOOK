import z from "zod";

import { userBookStatusSchema } from "~/common/user-book-status";

import { fetchServer } from "./constants";

const GetBookStatusResultSchema = z.object({
  status: userBookStatusSchema,
});

type GetBookStatusResultSchema = z.infer<typeof GetBookStatusResultSchema>;

export type GetBookStatusResult =
  | {
      ok: true;
      data: GetBookStatusResultSchema;
    }
  | {
      ok: false;
    };

export async function getBookStatus(
  token: string,
  id: string,
): Promise<GetBookStatusResult> {
  const response = await fetchServer(`book-status/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `getBookStatus response not ok: ${response.status} - ${response.statusText}`,
    );

    return {
      ok: false,
    };
  }

  const data = await response.json();

  const parsedResult = GetBookStatusResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(
      `getBookStatus parse error: ${z.prettifyError(parsedResult.error)}`,
    );

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
