import z from "zod";

import { fetchServer } from "../constants";

const authorFilterSchema = z.object({
  name: z.string().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  orderBy: z.discriminatedUnion("type", [
    z.object({ type: z.literal("name"), order: z.enum(["asc", "desc"]) }),
    z.object({ type: z.literal("createdAt"), order: z.enum(["asc", "desc"]) }),
  ]),
});

type AuthorFilterSchema = z.infer<typeof authorFilterSchema>;

function createQueryParams(filter: Partial<AuthorFilterSchema>): string {
  const params = new URLSearchParams();

  if (filter.name !== undefined) params.append("name", filter.name);

  if (filter.limit !== undefined)
    params.append("limit", filter.limit.toString());

  if (filter.offset !== undefined)
    params.append("offset", filter.offset.toString());

  if (filter.orderBy !== undefined) {
    params.append("orderType", filter.orderBy.type);
    params.append("order", filter.orderBy.order);
  }

  return params.toString();
}

const searchAuthorsResultSchema = z.object({
  authors: z.array(
    z.object({
      id: z.string().uuid(),
      // avatar: z.string().url().nullable(),
      firstname: z.string(),
      lastname: z.string(),
      middlename: z.string().nullable(),
      // dateOfBirth: z.coerce.date(),
      // biography: z.string(),
    }),
  ),
});

export type SearchAuthorsResultSchema = z.infer<
  typeof searchAuthorsResultSchema
>;

export type SearchAuthorsResult =
  | {
      ok: true;
      data: SearchAuthorsResultSchema;
    }
  | {
      ok: false;
    };

export async function searchAuthors(
  filter: AuthorFilterSchema,
): Promise<SearchAuthorsResult> {
  const queryString = createQueryParams(filter);
  const url = queryString.length > 0 ? `book-authors?${queryString}` : "books";

  const response = await fetchServer(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `getAuthors response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsed = searchAuthorsResultSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    data: parsed.data,
  };
}
