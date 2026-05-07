import React from "react";
import { useFetcher } from "react-router";
import z from "zod";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

import { modalCreateBookContainerStyle } from "./create-book.css";

const createBookDataScheme = z.object({
  title: z.string(),
  preview: z.string(),
  description: z.string(),
  attrs: z.record(z.string(), z.string().optional()),
});

type CreateBookModalProps = {
  onClose: () => void;
};

export const CreateBookModal = (props: CreateBookModalProps) => {
  const fetcher = useFetcher();

  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<HTMLInputElement>(null);

  const ageLimitRef = React.useRef<HTMLInputElement>(null);
  // const siteReleaseDateRef = React.useRef<HTMLInputElement>(null);
  const writingYearRef = React.useRef<HTMLInputElement>(null);
  const volumeRef = React.useRef<HTMLInputElement>(null);
  const copyrightHolderRef = React.useRef<HTMLInputElement>(null);

  const handleCreate = React.useCallback(async () => {
    if (titleRef.current === null) {
      return;
    }

    if (titleRef.current.value.length < 1) {
      return;
    }

    if (descriptionRef.current === null) {
      return;
    }

    if (descriptionRef.current.value.length < 1) {
      return;
    }

    if (previewRef.current === null) {
      return;
    }

    if (ageLimitRef.current === null) {
      return;
    }

    if (writingYearRef.current === null) {
      return;
    }

    if (volumeRef.current === null) {
      return;
    }

    if (copyrightHolderRef.current === null) {
      return;
    }

    const ageLimit =
      ageLimitRef.current.value.length > 0
        ? ageLimitRef.current.value
        : undefined;

    const writingYear =
      writingYearRef.current.value.length > 0
        ? writingYearRef.current.value
        : undefined;

    const volume =
      volumeRef.current.value.length > 0 ? volumeRef.current.value : undefined;

    const copyrightHolder =
      copyrightHolderRef.current.value.length > 0
        ? copyrightHolderRef.current.value
        : undefined;

    const parsed = createBookDataScheme.safeParse({
      title: titleRef.current.value,
      preview: previewRef.current.value,
      description: descriptionRef.current.value,
      attrs: {
        ageLimit: ageLimit,
        writingYear: writingYear,
        volume: volume,
        copyrightHolder: copyrightHolder,
      },
    });

    if (!parsed.success) {
      return;
    }

    fetcher.submit(
      JSON.parse(
        JSON.stringify({
          data: parsed.data,
        }),
      ),
      {
        action: "/api/cms/create-book",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Box className={modalCreateBookContainerStyle}>
        <Stack direction="column" justify="start" align="center" spacing={6}>
          <Typography textStyleVariant="size-20/bold" color="black/1">
            Добавить книгу
          </Typography>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Название
            </Typography>

            <TextInput ref={titleRef} placeholder="Название" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Описание
            </Typography>

            <TextInput ref={descriptionRef} placeholder="Описание" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Превью
            </Typography>

            <TextInput ref={previewRef} placeholder="Ссылка" />
          </Stack>

          <Typography textStyleVariant="size-16/bold">
            Дополнительные данные
          </Typography>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Возрастное ограничение
            </Typography>

            <TextInput ref={ageLimitRef} placeholder="16+" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Год написания
            </Typography>

            <TextInput ref={writingYearRef} placeholder="2010" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Объем
            </Typography>

            <TextInput ref={volumeRef} placeholder="250" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Правообладатель
            </Typography>

            <TextInput ref={copyrightHolderRef} placeholder="Правообладатель" />
          </Stack>

          <Button
            fluid={true}
            variant="accent"
            size="default"
            onClick={handleCreate}
          >
            Создать
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
