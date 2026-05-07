import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import type { AuthService } from "../../../auth";

import { type BookService } from "../../../book";
import { type Filter } from "../../../book/query/search-book.query";
import { userBookStatusSchema } from "../../../database/enums/user-book-status";

export function searchBooksEndpointFactory(
  authService: AuthService,
  bookService: BookService,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = request.query as any;

    const filter: Filter = {
      title: query.title,
      genres: query.genres
        ? Array.isArray(query.genres)
          ? query.genres
          : [query.genres]
        : [],
      authors: query.authors
        ? Array.isArray(query.authors)
          ? query.authors
          : [query.authors]
        : [],
      raiting: {
        min: query.minRating ? Number(query.minRating) : undefined,
        max: query.maxRating ? Number(query.maxRating) : undefined,
      },
      offset: query.offset ? Number(query.offset) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      orderBy: {
        type: query.orderType || "title",
        order: query.order || "asc",
      },
      userBookStatus: undefined,
    };

    const userBookStatus = z
      .array(userBookStatusSchema)
      .safeParse(Array.isArray(query.status) ? query.status : [query.status]);

    if (userBookStatus.success) {
      const userId = await getUserIdFromRequest(authService, request);

      if (userId !== null) {
        filter.userBookStatus = {
          userId: userId,
          status: userBookStatus.data,
        };
      }
    }

    const result = await bookService.searchBookQuery(filter);

    if (!result.ok) {
      console.error(result);

      reply.status(400);

      return;
    }

    reply.status(200).send({
      books: result.data.books,
    });
  };
}

async function getUserIdFromRequest(
  authService: AuthService,
  request: FastifyRequest,
): Promise<string | null> {
  if (request.headers.authorization === undefined) {
    return null;
  }

  const authorizationHeaderParts = request.headers.authorization.split(" ");

  if (authorizationHeaderParts.length !== 2) {
    return null;
  }

  if (authorizationHeaderParts[0] !== "Bearer") {
    return null;
  }

  const token = authorizationHeaderParts[1];

  const verifyTokenResult = await authService.verifyTokenCommand(token);

  if (!verifyTokenResult.ok) {
    return null;
  }

  return verifyTokenResult.data.userId;
}
