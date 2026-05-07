import type React from "react";

import { searchBooks } from "~/api/search-books";
import { BookCollection } from "~/components/composite/book-collection";
import { Stack } from "~/components/layout/stack/stack.component";
import { authContext } from "~/context/auth.context";

import type { Route } from "./+types/reading";

export async function loader(args: Route.LoaderArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return {
      books: [],
    };
  }

  const books = await searchBooks(
    {
      orderBy: {
        type: "title",
        order: "asc",
      },
      status: ["reading"],
    },
    auth.token,
  );

  return {
    books: books,
  };
}

export default function Tracking(props: Route.ComponentProps) {
  return (
    <>
      <Stack direction="column" spacing={6} horizontalFluid={true}>
        <BookCollection
          title="Коллекция книг"
          subtitle="Читаю"
          items={props.loaderData.books}
        />
      </Stack>
    </>
  );
}
