import React from "react";
import { redirect } from "react-router";

import { getGenres } from "~/api/cms/get-genres";
import { Button } from "~/components/common/button/button.component";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";
import { ConfirmDeleteGenreModal } from "~/modals/cms/genres/confirm-delete-genre";
import { CreateGenreModal } from "~/modals/cms/genres/create-genre";
import { EditGenreModal } from "~/modals/cms/genres/edit-genre";

import type { Route } from "./+types/genres";

import {
  cmsGenresGenreContainerDividerStyle,
  cmsGenresGenreContainerStyle,
} from "./genres.css";

export function meta(props: Route.MetaArgs) {
  return [
    { title: "OnBook | Genres" },
    {
      name: "description",
      content: "cms genres",
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const getGenresResult = await getGenres();

  if (!getGenresResult.ok) {
    return redirect("/");
  }

  return {
    genres: getGenresResult.data.genres,
  };
}

export default function Genres(props: Route.ComponentProps) {
  const [showCreateGenreModal, setShowCreateGenreModal] =
    React.useState<boolean>(false);

  const [comfirmDeleteModalData, setComfirmDeleteModalData] = React.useState<{
    id: string;
  } | null>(null);

  const [editGenreModalData, setEditGenreModalData] = React.useState<{
    id: string;
  } | null>(null);

  const openCreateGenreModal = () => setShowCreateGenreModal(true);
  const closeCreateGenreModal = () => setShowCreateGenreModal(false);

  const openDeleteGenreModal = (id: string) =>
    setComfirmDeleteModalData({
      id: id,
    });
  const closeDeleteGenreModal = () => setComfirmDeleteModalData(null);

  const openEditGenreModal = (id: string) =>
    setEditGenreModalData({
      id: id,
    });
  const closeEditGenreModal = () => setEditGenreModalData(null);

  return (
    <>
      {showCreateGenreModal && (
        <CreateGenreModal onClose={closeCreateGenreModal} />
      )}

      {comfirmDeleteModalData !== null && (
        <ConfirmDeleteGenreModal
          id={comfirmDeleteModalData.id}
          onClose={closeDeleteGenreModal}
        />
      )}

      {editGenreModalData !== null && (
        <EditGenreModal
          id={editGenreModalData.id}
          onClose={closeEditGenreModal}
        />
      )}

      <Stack direction="column" spacing={6} horizontalFluid={true}>
        <Stack
          direction="row"
          justify="between"
          horizontalFluid={true}
          align="center"
        >
          <Typography textStyleVariant="size-20/bold">Жанры</Typography>

          <Button
            variant="accent"
            size="default"
            onClick={openCreateGenreModal}
          >
            Добавить
          </Button>
        </Stack>
        <Stack direction="column" spacing={4}>
          {props.loaderData.genres.map((genre) => (
            <Box
              key={genre.id}
              padding={6}
              className={cmsGenresGenreContainerStyle}
            >
              <Stack
                direction="column"
                spacing={6}
                divider={
                  <div className={cmsGenresGenreContainerDividerStyle} />
                }
              >
                <Typography textStyleVariant="size-16/bold" color="black/1">
                  {genre.name}
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="success"
                    size="plain"
                    onClick={() => openEditGenreModal(genre.id)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="error"
                    size="plain"
                    onClick={() => openDeleteGenreModal(genre.id)}
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
