import z from "zod";

import type { UserBookStatus } from "~/common/user-book-status";

import { fetchServer } from "./constants";

type OrderByDirection = "asc" | "desc";

type Filter = {
  title?: string;
  genres?: string[];
  authors?: string[];
  raiting?: { min?: number; max?: number };
  offset?: number;
  limit?: number;
  status?: UserBookStatus[];
  orderBy: { type: "title" | "createdAt" | "raiting"; order: OrderByDirection };
};

export const bookWithDetailsSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string().min(1),
  preview: z.string().nullable(),
  averageRating: z.number().min(0).max(5),
  feedbackCount: z.number().int().min(0),

  genres: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      bookId: z.string().uuid(),
    }),
  ),

  authors: z.array(
    z.object({
      id: z.string().uuid(),
      avatar: z.string().url().nullable(),
      firstname: z.string(),
      lastname: z.string(),
      middlename: z.string().nullable(),
      dateOfBirth: z.coerce.date(),
      biography: z.string(),
      bookId: z.string().uuid(),
    }),
  ),
});

export type BookWithDetails = z.infer<typeof bookWithDetailsSchema>;

const searchBooksSchema = z.object({
  books: z.array(bookWithDetailsSchema),
});

export function createSearchBookQueryParams(filter: Partial<Filter>): string {
  const params = new URLSearchParams();

  if (filter.title !== undefined) params.append("title", filter.title);

  if (filter.limit !== undefined)
    params.append("limit", filter.limit.toString());

  if (filter.offset !== undefined)
    params.append("offset", filter.offset.toString());

  if (filter.genres !== undefined) {
    filter.genres.forEach((g) => params.append("genres", g));
  }

  if (filter.authors !== undefined) {
    filter.authors?.forEach((a) => params.append("authors", a));
  }

  if (filter.raiting !== undefined) {
    if (filter.raiting.min !== undefined)
      params.append("raitingMin", filter.raiting.min.toString());

    if (filter.raiting.max !== undefined)
      params.append("raitingMax", filter.raiting.max.toString());
  }

  if (filter.status !== undefined) {
    filter.status.forEach((s) => params.append("status", s));
  }

  if (filter.orderBy !== undefined) {
    params.append("orderType", filter.orderBy.type);
    params.append("order", filter.orderBy.order);
  }

  return params.toString();
}

export function parseSearchBookQueryParams(queryString: string): Filter {
  const params = new URLSearchParams(queryString);
  const filter: Filter = {
    orderBy: {
      type: "title",
      order: "asc",
    },
  };

  const title = params.get("title");

  if (title) filter.title = title;

  const limit = params.get("limit");

  if (limit) filter.limit = Number(limit);

  const offset = params.get("offset");

  if (offset) filter.offset = Number(offset);

  const genres = params.getAll("genres");

  if (genres.length > 0) filter.genres = genres;

  const authors = params.getAll("authors");

  if (authors.length > 0) filter.authors = authors;

  const status = params.getAll("status") as UserBookStatus[];

  if (status.length > 0) filter.status = status;

  const raitingMin = params.get("raitingMin");
  const raitingMax = params.get("raitingMax");

  if (raitingMin !== null || raitingMax !== null) {
    filter.raiting = {};

    if (raitingMin !== null) filter.raiting.min = Number(raitingMin);

    if (raitingMax !== null) filter.raiting.max = Number(raitingMax);
  }

  const orderType = params.get("orderType");
  const order = params.get("order");

  if (orderType && order) {
    filter.orderBy = {
      type: orderType,
      order: order,
    } as Filter["orderBy"];
  }

  return filter;
}

export async function searchBooks(
  filter: Filter,
  token?: string,
): Promise<BookWithDetails[]> {
  const queryString = createSearchBookQueryParams(filter);
  const url = queryString.length > 0 ? `books?${queryString}` : "books";

  const response = await fetchServer(url, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  const parsed = searchBooksSchema.safeParse(data);

  if (!parsed.success) {
    return [];
  }

  return parsed.data.books;
}
