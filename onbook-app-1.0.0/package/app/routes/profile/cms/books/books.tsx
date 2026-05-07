import React from "react";
import { redirect } from "react-router";

import { searchBooks } from "~/api/search-books";
import { Button } from "~/components/common/button/button.component";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";
import { authContext } from "~/context/auth.context";
import { AuthorBookModal } from "~/modals/cms/books/author-book";
import { DeleteBookModal } from "~/modals/cms/books/delete-book";
import { EditBookModal } from "~/modals/cms/books/edit-book";
import { GenreBookModal } from "~/modals/cms/books/genre-book";
import { CreateBookModal } from "~/modals/cms/genres/create-book";

import type { Route } from "./+types/books";

import {
  cmsBooksBookContainerDividerStyle,
  cmsBooksBookContainerStyle,
} from "./books.css";

export function meta(props: Route.MetaArgs) {
  return [
    { title: "OnBook | Books" },
    {
      name: "description",
      content: "cms books",
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return redirect("/");
  }

  const getBooksResult = await searchBooks({
    orderBy: {
      type: "createdAt",
      order: "desc",
    },
  });

  return {
    books: getBooksResult,
  };
}

export default function Books(props: Route.ComponentProps) {
  const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false);

  const [deleteModalData, setDeleteModalData] = React.useState<{
    id: string;
  } | null>(null);

  const [editModalData, setEditModalData] = React.useState<{
    id: string;
  } | null>(null);

  const [genreModalData, setGenreModalData] = React.useState<{
    id: string;
  } | null>(null);

  const [authorModalData, setAuthorModalData] = React.useState<{
    id: string;
  } | null>(null);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openDeleteModal = (id: string) =>
    setDeleteModalData({
      id: id,
    });
  const closeDeleteModal = () => setDeleteModalData(null);

  const openEditModal = (id: string) =>
    setEditModalData({
      id: id,
    });
  const closeEditModal = () => setEditModalData(null);

  const openGenreModal = (id: string) =>
    setGenreModalData({
      id: id,
    });
  const closeGenreModal = () => setGenreModalData(null);

  const openAuthorModal = (id: string) =>
    setAuthorModalData({
      id: id,
    });
  const closeAuthorModal = () => setAuthorModalData(null);

  return (
    <>
      {showCreateModal && <CreateBookModal onClose={closeCreateModal} />}

      {deleteModalData !== null && (
        <DeleteBookModal id={deleteModalData.id} onClose={closeDeleteModal} />
      )}

      {editModalData !== null && (
        <EditBookModal id={editModalData.id} onClose={closeEditModal} />
      )}

      {genreModalData !== null && (
        <GenreBookModal id={genreModalData.id} onClose={closeGenreModal} />
      )}

      {authorModalData !== null && (
        <AuthorBookModal id={authorModalData.id} onClose={closeAuthorModal} />
      )}

      <Stack direction="column" spacing={6} horizontalFluid={true}>
        <Stack
          direction="row"
          justify="between"
          horizontalFluid={true}
          align="center"
        >
          <Typography textStyleVariant="size-20/bold">Книги</Typography>

          <Button variant="accent" size="default" onClick={openCreateModal}>
            Добавить
          </Button>
        </Stack>

        <Stack direction="column" spacing={4}>
          {props.loaderData.books.map((book) => (
            <Box
              key={book.id}
              padding={6}
              className={cmsBooksBookContainerStyle}
            >
              <Stack
                direction="column"
                spacing={6}
                divider={<div className={cmsBooksBookContainerDividerStyle} />}
              >
                <Stack direction="row" spacing={4} align="center">
                  <Typography textStyleVariant="size-16/bold" color="black/1">
                    {book.title}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="success"
                    size="plain"
                    onClick={() => openEditModal(book.id)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="success"
                    size="plain"
                    onClick={() => openGenreModal(book.id)}
                  >
                    Изменить жанры
                  </Button>
                  <Button
                    variant="success"
                    size="plain"
                    onClick={() => openAuthorModal(book.id)}
                  >
                    Изменить авторов
                  </Button>
                  <Button
                    variant="error"
                    size="plain"
                    onClick={() => openDeleteModal(book.id)}
                  >
                    Удалить
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
