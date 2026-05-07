import React, { useCallback, useMemo, useState } from "react";
import { redirect, useFetcher, useRouteLoaderData } from "react-router";

import { getBook } from "~/api/get-book";
import { getBookAuthors } from "~/api/get-book-author";
import { getBookFeedbacks } from "~/api/get-book-feedbacks";
import { getBookGenres } from "~/api/get-book-genres";
import { getBookStatus } from "~/api/get-book-status";
import {
  userBookStatusSchema,
  type UserBookStatus,
} from "~/common/user-book-status";
import { Button } from "~/components/common/button/button.component";
import { Typography } from "~/components/common/typography";
import { Feedback } from "~/components/composite/feedback";
import { Stack } from "~/components/layout/stack/stack.component";
import { spacing } from "~/components/layout/utils/spacing";
import { authContext } from "~/context/auth.context";
import { FeedbackModal } from "~/modals/feedback";

import { type Route as LayoutRoute } from "../+types/layout";
import { type Route } from "./+types/book";
import { keyValue } from "./book.css";

const METADATA_LABELS: Record<string, string> = {
  ageLimit: "Возрастное ограничение",
  writingYear: "Год написания",
  volume: "Объем",
  copyrightHolder: "Правообладатель",
};

export function meta(props: Route.MetaArgs) {
  return [
    { title: "OnBook | Book" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const getBookResult = await getBook(args.params.bookId);

  if (!getBookResult.ok) {
    return redirect("/");
  }

  const getBookAuthorsResult = await getBookAuthors(args.params.bookId);

  if (!getBookAuthorsResult.ok) {
    return redirect("/");
  }

  const getBookFeedbacksResult = await getBookFeedbacks(args.params.bookId);

  if (!getBookFeedbacksResult.ok) {
    return redirect("/");
  }

  const getBookGenresResult = await getBookGenres(args.params.bookId);

  if (!getBookGenresResult.ok) {
    return redirect("/");
  }

  const auth = args.context.get(authContext);

  let userBookStatus: UserBookStatus | null = null;

  if (auth !== null) {
    const getBookStatusResult = await getBookStatus(
      auth.token,
      args.params.bookId,
    );

    if (getBookStatusResult.ok) {
      userBookStatus = getBookStatusResult.data.status;
    }
  }

  return {
    isAuthorized: auth !== null,
    book: getBookResult.data.book,
    authors: getBookAuthorsResult.data.authors,
    feedbacks: getBookFeedbacksResult.data.feedbacks,
    genres: getBookGenresResult.data.genres,
    userBookStatus: userBookStatus,
  };
}

export default function Book(props: Route.ComponentProps) {
  const fetcher = useFetcher();

  const commonData = useRouteLoaderData(
    "common",
  ) as LayoutRoute.ComponentProps["loaderData"];

  const authors = useMemo(() => {
    return props.loaderData.authors
      .map((author) =>
        [author.firstname, author.middlename, author.lastname].join(" "),
      )
      .join(", ");
  }, [props.loaderData.authors]);

  const attrs = useMemo(() => {
    const keyValue: [string, string][] = [];

    for (const [key, value] of Object.entries(props.loaderData.book.attrs)) {
      if (!(key in METADATA_LABELS)) {
        continue;
      }

      keyValue.push([METADATA_LABELS[key], value]);
    }

    return keyValue;
  }, [props.loaderData.book.attrs]);

  const genres = useMemo(() => {
    if (props.loaderData.genres.length < 1) {
      return null;
    }

    return props.loaderData.genres.map((genre) => genre.name).join(", ");
  }, [props.loaderData.genres]);

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  const openFeedbackModal = useCallback(
    () => setShowFeedbackModal(true),
    [setShowFeedbackModal],
  );

  const closeFeedbackModal = useCallback(
    () => setShowFeedbackModal(false),
    [setShowFeedbackModal],
  );

  const handleOpenFeedbackModal = useCallback(() => {
    if (commonData.user === null) {
      alert("необходимо войти в аккаунт");

      return;
    }

    openFeedbackModal();
  }, [commonData, openFeedbackModal]);

  const handleSelectUserBookStatus = (status: UserBookStatus | null) => {
    console.log(status);

    if (status === null) {
      fetcher.submit(
        {
          id: props.loaderData.book.id,
        },
        {
          action: "/api/unset-book-status",
          method: "POST",
          encType: "application/json",
        },
      );

      return;
    }

    fetcher.submit(
      {
        id: props.loaderData.book.id,
        status: status,
      },
      {
        action: "/api/set-book-status",
        method: "POST",
        encType: "application/json",
      },
    );
  };

  return (
    <>
      {showFeedbackModal && (
        <FeedbackModal
          bookId={props.params.bookId}
          onClose={closeFeedbackModal}
        />
      )}

      <Stack
        direction="column"
        justify="start"
        align="start"
        horizontalFluid={true}
        spacing={16}
      >
        <Stack
          direction="row"
          justify="start"
          align="start"
          spacing={9}
          horizontalFluid={true}
        >
          <div
            style={{
              flex: "none",
              width: "280px",
              height: "440px",
              outline: "1px solid #131313",
              borderRadius: spacing(3),
            }}
          >
            {props.loaderData.book.preview ? (
              <img
                src={props.loaderData.book.preview}
                style={{
                  objectFit: "cover",
                  objectPosition: "center, center",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Typography>картинку не придумали</Typography>
            )}
          </div>

          <Stack
            direction="column"
            justify="start"
            align="start"
            spacing={6}
            horizontalFluid={true}
          >
            <Stack
              direction="column"
              justify="start"
              align="start"
              spacing={4}
              horizontalFluid={true}
            >
              <Stack
                direction="row"
                justify="between"
                align="center"
                horizontalFluid={true}
              >
                <Typography textStyleVariant="size-20/bold" color="black/1">
                  {props.loaderData.book.title}
                </Typography>

                {props.loaderData.isAuthorized && (
                  <UserBookStatusSelector
                    value={props.loaderData.userBookStatus}
                    onSelect={handleSelectUserBookStatus}
                  />
                )}
              </Stack>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                {authors}
              </Typography>

              <Stack direction="row" justify="start" align="center" spacing={4}>
                <Stack
                  direction="row"
                  justify="start"
                  align="center"
                  spacing={1}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
                      fill="#FFB900"
                    />
                  </svg>

                  <Typography
                    textStyleVariant="size-14/semibold"
                    color="black/1"
                  >
                    {props.loaderData.book.averageRating}
                  </Typography>
                </Stack>

                <svg
                  width="5"
                  height="5"
                  viewBox="0 0 5 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#717182" />
                </svg>

                <Typography textStyleVariant="size-14/regular" color="gray/1">
                  {genres ?? "Жанры не указаны"}
                </Typography>
              </Stack>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                {props.loaderData.book.description}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              justify="start"
              align="start"
              spacing={2}
              horizontalFluid={true}
            >
              {attrs.map((attr) => (
                <KeyValue key={attr[0]} title={attr[0]} value={attr[1]} />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          justify="start"
          align="start"
          spacing={9}
          horizontalFluid={true}
        >
          <Stack
            direction="row"
            justify="between"
            align="center"
            horizontalFluid={true}
          >
            <Typography textStyleVariant="size-14/semibold" color="black/1">
              Отзывы{" "}
              <Typography color="gray/1">
                {props.loaderData.feedbacks.length}
              </Typography>
            </Typography>

            <Button variant="plain" onClick={handleOpenFeedbackModal}>
              <Stack direction="row" justify="start" align="center" spacing={1}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                    fill="#030213"
                  />
                </svg>

                <Typography textStyleVariant="size-14/semibold" color="black/1">
                  Оставить отзыв
                </Typography>
              </Stack>
            </Button>
          </Stack>

          {/* list */}
          <Stack
            direction="column"
            justify="start"
            align="start"
            horizontalFluid={true}
            spacing={12}
          >
            {props.loaderData.feedbacks.map((feedback) => (
              <Feedback
                key={feedback.createdAt}
                name={feedback.user.login}
                avatar={feedback.user.avatar}
                comment={feedback.comment}
                score={feedback.score}
                createdAt={Date.now()}
              />
            ))}
          </Stack>
        </Stack>

        {/* <BookCollection /> */}
      </Stack>
    </>
  );
}

type KeyValueProps = {
  title: string;
  value: string;
};

const KeyValue = (props: KeyValueProps) => {
  return (
    <div className={keyValue.style}>
      <Typography
        textStyleVariant="size-14/regular"
        color="gray/1"
        className={keyValue.title.style}
      >
        {props.title}
      </Typography>

      <div className={keyValue.dots.style} />

      <Typography
        textStyleVariant="size-14/semibold"
        color="black/1"
        className={keyValue.value.style}
      >
        {props.value}
      </Typography>
    </div>
  );
};

type UserBookStatusSelectorProps = {
  value: UserBookStatus | null;
  onSelect: (value: UserBookStatus | null) => void;
};

const UserBookStatusSelector = (props: UserBookStatusSelectorProps) => {
  return (
    <select
      value={props.value ?? "unset"}
      onChange={(event) => {
        if (event.currentTarget.value === "unset") {
          props.onSelect(null);

          return;
        }

        props.onSelect(event.currentTarget.value as UserBookStatus);
      }}
    >
      <option value={"unset"}>Не выбрано</option>
      {Object.values(userBookStatusSchema.enum).map((value) => {
        switch (value) {
          case "completed": {
            return <option value={value}>Прочтена</option>;
          }
          case "dropped": {
            return <option value={value}>Брошено</option>;
          }
          case "on_hold": {
            return <option value={value}>Любимое</option>;
          }
          case "reading": {
            return <option value={value}>Читаю</option>;
          }
          case "to_read": {
            return <option value={value}>К прочтению</option>;
          }
          default: {
            return <option value={value}>{value}</option>;
          }
        }
      })}
    </select>
  );
};
