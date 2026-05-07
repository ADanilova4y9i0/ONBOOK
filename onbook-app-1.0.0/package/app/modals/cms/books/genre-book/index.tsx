import React from "react";
import { useFetcher } from "react-router";

import { getGenres, type GetGenresResultSchema } from "~/api/cms/get-genres";
import { getBookGenres } from "~/api/get-book-genres";
import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

import { genreBookModalContainerStyle } from "./genre-book.css";

type GenreBookModalProps = {
  id: string;
  onClose: () => void;
};

export const GenreBookModal = (props: GenreBookModalProps) => {
  const [currentBookGenres, setCurrentBookGenres] = React.useState<
    GetGenresResultSchema["genres"]
  >([]);

  const [bookGenres, setBookGenres] = React.useState<
    GetGenresResultSchema["genres"]
  >([]);

  const [allGenres, setAllGenres] = React.useState<
    GetGenresResultSchema["genres"]
  >([]);

  const [genresToSelect, setGenresToSelect] = React.useState<
    GetGenresResultSchema["genres"]
  >([]);

  const selectGenre = React.useCallback(
    (id: string) => {
      const genre = allGenres.find((g) => g.id === id);

      if (genre === undefined) {
        return;
      }

      setGenresToSelect((previous) => previous.filter((g) => g.id !== id));
      setBookGenres((previous) => [...previous, genre]);
    },

    [allGenres],
  );

  const unselectGenre = React.useCallback(
    (id: string) => {
      const genre = allGenres.find((g) => g.id === id);

      if (genre === undefined) {
        return;
      }

      setBookGenres((previous) => previous.filter((g) => g.id !== id));
      setGenresToSelect((previous) => [...previous, genre]);
    },

    [allGenres],
  );

  const fetchData = React.useCallback(async () => {
    const [getGenresResult, getBookGenresResult] = await Promise.all([
      getGenres(),
      getBookGenres(props.id),
    ]);

    if (!getGenresResult.ok) {
      return;
    }

    if (!getBookGenresResult.ok) {
      return;
    }

    setAllGenres(getGenresResult.data.genres);

    setCurrentBookGenres(getBookGenresResult.data.genres);

    setBookGenres(getBookGenresResult.data.genres);

    const genres = getGenresResult.data.genres.filter((genre) => {
      if (
        getBookGenresResult.data.genres.findIndex(
          (booKGenre) => booKGenre.id === genre.id,
        ) > -1
      ) {
        return false;
      }

      return true;
    });

    setGenresToSelect(genres);
  }, [props.id]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleKeyUp = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (event) => {
      const genres = allGenres.filter((genre) => {
        if (
          bookGenres.findIndex((booKGenre) => booKGenre.id === genre.id) > -1
        ) {
          return false;
        }

        return genre.name
          .toLowerCase()
          .includes(event.currentTarget.value.toLowerCase());
      });

      setGenresToSelect(genres);
    },
    [allGenres, bookGenres],
  );

  const fetcher = useFetcher();

  const handleChange = React.useCallback(() => {
    const currentIds = new Set(currentBookGenres.map((g) => g.id));
    const newIds = new Set(bookGenres.map((g) => g.id));

    const toAdd = bookGenres.filter((g) => !currentIds.has(g.id));

    const toRemove = currentBookGenres.filter((g) => !newIds.has(g.id));

    fetcher.submit(
      {
        bookId: props.id,
        toAdd: toAdd.map((g) => g.id),
        toRemove: toRemove.map((g) => g.id),
      },
      {
        action: "/api/cms/edit-book-genres",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, [props.id, currentBookGenres, bookGenres]);

  return (
    <Modal onClose={props.onClose}>
      <Box
        paddingHorizontal={3}
        paddingVertical={5}
        className={genreBookModalContainerStyle}
      >
        <Stack direction="column" justify="start" align="center" spacing={6}>
          <Typography textStyleVariant="size-20/bold" color="black/1">
            Изменить жанры
          </Typography>

          <TextInput
            left={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 14L10 10M2 6.66667C2 7.2795 2.12071 7.88634 2.35523 8.45252C2.58975 9.01871 2.93349 9.53316 3.36683 9.9665C3.80018 10.3998 4.31462 10.7436 4.88081 10.9781C5.447 11.2126 6.05383 11.3333 6.66667 11.3333C7.2795 11.3333 7.88634 11.2126 8.45252 10.9781C9.01871 10.7436 9.53316 10.3998 9.9665 9.9665C10.3998 9.53316 10.7436 9.01871 10.9781 8.45252C11.2126 7.88634 11.3333 7.2795 11.3333 6.66667C11.3333 6.05383 11.2126 5.447 10.9781 4.88081C10.7436 4.31462 10.3998 3.80018 9.9665 3.36683C9.53316 2.93349 9.01871 2.58975 8.45252 2.35523C7.88634 2.12071 7.2795 2 6.66667 2C6.05383 2 5.447 2.12071 4.88081 2.35523C4.31462 2.58975 3.80018 2.93349 3.36683 3.36683C2.93349 3.80018 2.58975 4.31462 2.35523 4.88081C2.12071 5.447 2 6.05383 2 6.66667Z"
                  stroke="#717181"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            placeholder="Поиск жанров"
            onKeyUp={handleKeyUp}
          />

          {bookGenres.map((genre) => (
            <Stack
              direction="row"
              justify="between"
              align="center"
              onClick={() => unselectGenre(genre.id)}
              horizontalFluid={true}
              style={{ cursor: "pointer" }}
            >
              <Typography>{genre.name}</Typography>

              <Typography>[yes]</Typography>
            </Stack>
          ))}

          {genresToSelect.map((genre) => (
            <Stack
              direction="row"
              justify="between"
              align="center"
              onClick={() => selectGenre(genre.id)}
              horizontalFluid={true}
              style={{ cursor: "pointer" }}
            >
              <Typography>{genre.name}</Typography>

              <Typography>[no]</Typography>
            </Stack>
          ))}

          <Button
            fluid={true}
            variant="accent"
            size="default"
            onClick={handleChange}
          >
            Применить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
