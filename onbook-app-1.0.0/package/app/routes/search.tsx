import { parseSearchBookQueryParams, searchBooks } from "~/api/search-books";
import { Typography } from "~/components/common/typography";
import { BookCollection } from "~/components/composite/book-collection";
import { Stack } from "~/components/layout/stack/stack.component";

import type { Route } from "./+types/search";

export async function loader(args: Route.LoaderArgs) {
  // args.params

  const url = new URL(args.request.url);
  const filter = parseSearchBookQueryParams(url.search);

  const books = await searchBooks(filter);

  return {
    books: books,
  };
}

export function meta(args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Search(props: Route.ComponentProps) {
  return (
    <Stack direction="row" justify="start" align="start" spacing={32}>
      <Stack direction="column" justify="start" align="start" spacing={6}>
        <Typography textStyleVariant="size-16/bold" color="black/1">
          <p></p>
        </Typography>
      </Stack>
      <BookCollection
        title="Поиск книг"
        subtitle=""
        items={props.loaderData.books}
      />
    </Stack>
  );
}
