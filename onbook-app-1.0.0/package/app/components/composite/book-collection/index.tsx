import React from "react";
import { useNavigate } from "react-router";

import type { BookWithDetails } from "~/api/search-books";

import { Typography } from "~/components/common/typography";
import { Stack } from "~/components/layout/stack/stack.component";

import { bookCollectionList } from "./book-collection.css";

type BookCollectionProps = {
  title: string;
  subtitle: string;

  items: BookWithDetails[];
};

export const BookCollection = (props: BookCollectionProps) => {
  return (
    <Stack
      direction="column"
      justify="start"
      align="start"
      horizontalFluid={true}
      spacing={6}
    >
      <Stack
        direction="row"
        justify="between"
        align="center"
        horizontalFluid={true}
      >
        <Stack direction="column" justify="start" align="start" spacing={2}>
          <Typography textStyleVariant="size-16/bold" color="black/1">
            {props.title}
          </Typography>
          <Typography textStyleVariant="size-14/regular" color="gray/1">
            {props.subtitle}
          </Typography>
        </Stack>

        {/* <Typography textStyleVariant="size-14/semibold" color="black/1">
          Смотреть все
        </Typography> */}
      </Stack>

      <BookCollectionList items={props.items} />
    </Stack>
  );
};

type BookCollectionListItemProps = {
  bookWithDetails: BookWithDetails;
};

export const BookCollectionListItem = (props: BookCollectionListItemProps) => {
  const navigate = useNavigate();

  const handlePreviewClick = React.useCallback(() => {
    navigate(`/books/${props.bookWithDetails.id}`);
  }, [props.bookWithDetails.id]);

  return (
    <div className={bookCollectionList.item.style}>
      <div className={bookCollectionList.item.imageWrapper.style}>
        <img
          src={props.bookWithDetails.preview ?? ""}
          className={bookCollectionList.item.imageWrapper.image.style}
          alt="TODO"
          onClick={handlePreviewClick}
        />
      </div>

      <Stack direction="column" justify="start" align="stretch" spacing={2}>
        <Stack direction="row" justify="between" align="center">
          <Typography textStyleVariant="size-16/semibold" color="black/1">
            {props.bookWithDetails.title}
          </Typography>

          <Stack direction="row" justify="end" align="center" spacing={1}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.08325 4.26667L6.94992 1.85C7.08325 1.67222 7.24158 1.54167 7.42492 1.45834C7.60825 1.375 7.79992 1.33334 7.99992 1.33334C8.19992 1.33334 8.39158 1.375 8.57492 1.45834C8.75825 1.54167 8.91658 1.67222 9.04992 1.85L10.9166 4.26667L13.7499 5.21667C14.0388 5.30556 14.2666 5.46945 14.4333 5.70834C14.5999 5.94723 14.6833 6.21111 14.6833 6.5C14.6833 6.63334 14.6638 6.76667 14.6249 6.9C14.586 7.03334 14.5221 7.16111 14.4333 7.28334L12.5999 9.88334L12.6666 12.6167C12.6777 13.0056 12.5499 13.3333 12.2833 13.6C12.0166 13.8667 11.7055 14 11.3499 14C11.3277 14 11.2055 13.9833 10.9833 13.95L7.99992 13.1167L5.01659 13.95C4.96103 13.9722 4.89992 13.9861 4.83325 13.9917C4.76659 13.9972 4.70547 14 4.64992 14C4.29436 14 3.98325 13.8667 3.71659 13.6C3.44992 13.3333 3.32214 13.0056 3.33325 12.6167L3.39992 9.86667L1.58325 7.28334C1.49436 7.16111 1.43047 7.03334 1.39159 6.9C1.3527 6.76667 1.33325 6.63334 1.33325 6.5C1.33325 6.22223 1.41381 5.96389 1.57492 5.725C1.73603 5.48611 1.96103 5.31667 2.24992 5.21667L5.08325 4.26667Z"
                fill="#FFB900"
              />
            </svg>

            <Typography textStyleVariant="size-14/semibold" color="black/1">
              {props.bookWithDetails.averageRating}
            </Typography>
          </Stack>
        </Stack>
        {props.bookWithDetails.authors.length > 0 ? (
          <Typography textStyleVariant="size-14/regular" color="gray/1">
            {[
              props.bookWithDetails.authors[0].firstname,
              props.bookWithDetails.authors[0].middlename,
              props.bookWithDetails.authors[0].lastname,
            ].join(" ")}
          </Typography>
        ) : null}
      </Stack>
    </div>
  );
};

type BookCollectionListProps = {
  items: BookWithDetails[];
};

const BookCollectionList = (props: BookCollectionListProps) => {
  return (
    <div className={bookCollectionList.style}>
      {props.items.map((item) => (
        <BookCollectionListItem key={item.id} bookWithDetails={item} />
      ))}
    </div>
  );
};
