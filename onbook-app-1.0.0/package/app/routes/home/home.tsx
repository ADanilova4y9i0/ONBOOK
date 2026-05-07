import React from "react";

import { searchBooks } from "~/api/search-books";
import { BookCollection } from "~/components/composite/book-collection";
import { Stack } from "~/components/layout/stack/stack.component";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OnBook | Home" },
    { name: "description", content: "Welcome to OnBook" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const [popularBooks, newBooks] = await Promise.all([
    searchBooks({
      limit: 6,
      orderBy: {
        type: "raiting",
        order: "desc",
      },
    }),
    searchBooks({
      limit: 6,
      orderBy: {
        type: "createdAt",
        order: "desc",
      },
    }),
  ]);

  return {
    popularBooks: popularBooks,
    newBooks: newBooks,
  };
}

export default function Home(props: Route.ComponentProps) {
  return (
    <Stack
      direction="column"
      justify="start"
      align="start"
      horizontalFluid={true}
      spacing={16}
    >
      <BookCollection
        title="Рекомендуем к прочтению"
        subtitle="Лучшие книги по мнению читателей"
        items={props.loaderData.popularBooks}
      />

      <BookCollection
        title="Рекомендуем к прочтению"
        subtitle="Самые новые книги на сайте"
        items={props.loaderData.newBooks}
      />
    </Stack>
  );
}
