import React from "react";
import { redirect } from "react-router";

import { searchAuthors } from "~/api/cms/search-authors";
import { Avatar } from "~/components/common/avatar";
import { Button } from "~/components/common/button/button.component";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";
import { authContext } from "~/context/auth.context";
import { ConfirmDeleteAuthorModal } from "~/modals/cms/genres/confirm-delete-author";
import { CreateAuthorModal } from "~/modals/cms/genres/create-author";
import { EditAuthorModal } from "~/modals/cms/genres/edit-author";

import type { Route } from "./+types/authors";

import {
  cmsGenresAuthorContainerDividerStyle,
  cmsGenresAuthorContainerStyle,
} from "./authors.css";

export function meta(props: Route.MetaArgs) {
  return [
    { title: "OnBook | Authors" },
    {
      name: "description",
      content: "cms authors",
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const auth = args.context.get(authContext);

  if (auth === null) {
    return redirect("/");
  }

  const getAuthorsResult = await searchAuthors({
    orderBy: {
      type: "createdAt",
      order: "desc",
    },
  });

  if (!getAuthorsResult.ok) {
    return redirect("/");
  }

  return {
    authors: getAuthorsResult.data.authors,
  };
}

export default function Authors(props: Route.ComponentProps) {
  const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false);

  const [deleteAuthorModalData, setDeleteAuthorModalData] = React.useState<{
    id: string;
  } | null>(null);

  const [editAuthorModalData, setEditAuthorModalData] = React.useState<{
    id: string;
  } | null>(null);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openDeleteAuthorModal = (id: string) =>
    setDeleteAuthorModalData({
      id: id,
    });
  const closeDeleteAuthorModal = () => setDeleteAuthorModalData(null);

  const openEditAuthorModal = (id: string) =>
    setEditAuthorModalData({
      id: id,
    });
  const closeEditAuthorModal = () => setEditAuthorModalData(null);

  return (
    <>
      {showCreateModal && <CreateAuthorModal onClose={closeCreateModal} />}

      {deleteAuthorModalData !== null && (
        <ConfirmDeleteAuthorModal
          id={deleteAuthorModalData.id}
          onClose={closeDeleteAuthorModal}
        />
      )}

      {editAuthorModalData !== null && (
        <EditAuthorModal
          id={editAuthorModalData.id}
          onClose={closeEditAuthorModal}
        />
      )}

      <Stack direction="column" spacing={6} horizontalFluid={true}>
        <Stack
          direction="row"
          justify="between"
          horizontalFluid={true}
          align="center"
        >
          <Typography textStyleVariant="size-20/bold">Авторы</Typography>

          <Button variant="accent" size="default" onClick={openCreateModal}>
            Добавить
          </Button>
        </Stack>
        <Stack direction="column" spacing={4}>
          {props.loaderData.authors.map((author) => (
            <Box
              key={author.id}
              padding={6}
              className={cmsGenresAuthorContainerStyle}
            >
              <Stack
                direction="column"
                spacing={6}
                divider={
                  <div className={cmsGenresAuthorContainerDividerStyle} />
                }
              >
                <Stack direction="row" spacing={4} align="center">
                  <Avatar
                    size="size-48"
                    avatar={{
                      type: "url",
                      url: "https://placehold.co/100x100",
                    }}
                  />
                  <Typography textStyleVariant="size-16/bold" color="black/1">
                    {author.firstname} {author.lastname} {author.middlename}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="success"
                    size="plain"
                    onClick={() => openEditAuthorModal(author.id)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="error"
                    size="plain"
                    onClick={() => openDeleteAuthorModal(author.id)}
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
