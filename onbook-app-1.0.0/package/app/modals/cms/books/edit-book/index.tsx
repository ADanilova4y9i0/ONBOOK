import React from "react";
import { useFetcher } from "react-router";
import z from "zod";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

import { modalEditBookContainerStyle } from "./edit-book.css";

const editBookDataScheme = z.object({
  title: z.string().optional(),
  preview: z.string().optional(),
  description: z.string().optional(),
  attrs: z.record(z.string(), z.string().optional()),
});

type EditBookModalProps = {
  id: string;
  onClose: () => void;
};

export const EditBookModal = (props: EditBookModalProps) => {
  const fetcher = useFetcher();

  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<HTMLInputElement>(null);

  const ageLimitRef = React.useRef<HTMLInputElement>(null);
  const writingYearRef = React.useRef<HTMLInputElement>(null);
  const volumeRef = React.useRef<HTMLInputElement>(null);
  const copyrightHolderRef = React.useRef<HTMLInputElement>(null);

  const handleCreate = React.useCallback(async () => {
    if (titleRef.current === null) {
      return;
    }

    if (descriptionRef.current === null) {
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

    const title =
      titleRef.current.value.length > 0 ? titleRef.current.value : undefined;

    const description =
      descriptionRef.current.value.length > 0
        ? descriptionRef.current.value
        : undefined;

    const preview =
      previewRef.current.value.length > 0
        ? previewRef.current.value
        : undefined;

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

    const parsed = editBookDataScheme.safeParse({
      title: title,
      preview: preview,
      description: description,
      attrs: {
        ageLimit: ageLimit,
        writingYear: writingYear,
        volume: volume,
        copyrightHolder: copyrightHolder,
      },
    });

    if (!parsed.success) {
      console.log(parsed.error);

      return;
    }

    fetcher.submit(
      JSON.parse(
        JSON.stringify({
          id: props.id,
          data: parsed.data,
        }),
      ),
      {
        action: "/api/cms/edit-book",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Box className={modalEditBookContainerStyle}>
        <Stack direction="column" justify="start" align="center" spacing={6}>
          <Typography textStyleVariant="size-20/bold" color="black/1">
            Редактирование книги
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

            <TextInput ref={writingYearRef} placeholder="2004" />
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
            Применить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
