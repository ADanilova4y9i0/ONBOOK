import z from "zod";

import { type DatabaseConnection } from "../../database/connection";

export type SearchAuthorsResult =
  | {
      ok: true;
      data: {
        authors: {
          id: string;
          firstname: string;
          lastname: string;
          middlename: string | null;
        }[];
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export const authorFilterSchema = z.object({
  name: z.string().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  orderBy: z.discriminatedUnion("type", [
    z.object({ type: z.literal("name"), order: z.enum(["asc", "desc"]) }),
    z.object({ type: z.literal("createdAt"), order: z.enum(["asc", "desc"]) }),
  ]),
});

export type AuthorFilter = z.infer<typeof authorFilterSchema>;

export function searchAuthorsQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (filter: AuthorFilter): Promise<SearchAuthorsResult> => {
    let query = await databaseConnection
      .selectFrom("bookAuthor")
      .select([
        "bookAuthor.id",
        "bookAuthor.firstname",
        "bookAuthor.middlename",
        "bookAuthor.lastname",
      ])
      .groupBy("bookAuthor.id");

    if (filter.name) {
      query = query.having((eb) =>
        eb.or([
          eb("bookAuthor.firstname", "ilike", `%${filter.name}%`),
          eb("bookAuthor.lastname", "ilike", `%${filter.name}%`),
          eb("bookAuthor.middlename", "ilike", `%${filter.name}%`),
        ]),
      );
    }

    switch (filter.orderBy.type) {
      case "name": {
        query = query
          .orderBy("bookAuthor.firstname", filter.orderBy.order)
          .orderBy("bookAuthor.lastname", filter.orderBy.order)
          .orderBy("bookAuthor.middlename", filter.orderBy.order)
          .orderBy("bookAuthor.id", "asc");

        break;
      }
      case "createdAt": {
        query = query
          .orderBy("bookAuthor.createdAt", filter.orderBy.order)
          .orderBy("bookAuthor.id", "asc");

        break;
      }
    }

    if (filter.offset !== undefined) {
      query = query.offset(filter.offset);
    }

    if (filter.limit !== undefined) {
      query = query.limit(filter.limit);
    }

    const authors = await query.execute();

    return {
      ok: true,
      data: {
        authors: authors,
      },
    };
  };
}

export type SearchAuthorsQuery = ReturnType<typeof searchAuthorsQueryFactory>;
