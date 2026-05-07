import z from "zod";

import { fetchServer } from "./constants";

const GetProfileResultSchema = z.object({
  user: z.object({
    id: z.string(),
    login: z.string(),
    avatar: z.string().nullable(),
    createdAt: z.number(),
    isAdmin: z.boolean(),
  }),
});

type GetProfileResultSchema = z.infer<typeof GetProfileResultSchema>;

export type GetProfileResult =
  | {
      ok: true;
      data: GetProfileResultSchema;
    }
  | {
      ok: false;
    };

export async function getProfile(token: string): Promise<GetProfileResult> {
  const response = await fetchServer(`profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(
      `getProfile response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = GetProfileResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(
      `getProfile parse error: ${z.prettifyError(parsedResult.error)}`,
    );

    return { ok: false };
  }

  return {
    ok: true,
    data: parsedResult.data,
  };
}
