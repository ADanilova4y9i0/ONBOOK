import React from "react";
import { useFetcher } from "react-router";
import z from "zod";

import { Button } from "~/components/common/button/button.component";
import { DateInput } from "~/components/common/date-input/date-input";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Textarea } from "~/components/common/textarea/textarea";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

import { modalEditAuthorContainerStyle } from "./edit-author.css";

const editAuthorDataScheme = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  middlename: z.string().optional().nullable(),
  dateOfBirth: z.number().min(0).optional(),
  biography: z.string().optional(),
  avatar: z.string().optional().nullable(),
});

type CreateAuthorModalProps = {
  id: string;
  onClose: () => void;
};

export const EditAuthorModal = (props: CreateAuthorModalProps) => {
  const fetcher = useFetcher();

  const firstnameRef = React.useRef<HTMLInputElement>(null);
  const lastnameRef = React.useRef<HTMLInputElement>(null);
  const middlenameRef = React.useRef<HTMLInputElement>(null);
  const biographyRef = React.useRef<HTMLTextAreaElement>(null);
  const dateOfBirthRef = React.useRef<HTMLInputElement>(null);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const handleCreate = React.useCallback(async () => {
    if (firstnameRef.current == null) {
      return;
    }

    if (lastnameRef.current == null) {
      return;
    }

    if (middlenameRef.current == null) {
      return;
    }

    if (biographyRef.current == null) {
      return;
    }

    if (dateOfBirthRef.current == null) {
      return;
    }

    if (avatarRef.current == null) {
      return;
    }

    const firstname =
      firstnameRef.current.value.length > 0
        ? firstnameRef.current.value
        : undefined;

    const lastname =
      lastnameRef.current.value.length > 0
        ? lastnameRef.current.value
        : undefined;

    const middlename =
      middlenameRef.current.value.length > 0
        ? middlenameRef.current.value
        : null;

    const biography =
      biographyRef.current.value.length > 0
        ? biographyRef.current.value
        : undefined;

    const dateOfBirth =
      dateOfBirthRef.current.value.length > 0
        ? new Date(dateOfBirthRef.current.value)
        : undefined;

    const parsed = editAuthorDataScheme.safeParse({
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      biography: biography,
      dateOfBirth: dateOfBirth,
      avatar:
        avatarRef.current.value.length < 1 ? null : avatarRef.current.value,
    });

    if (!parsed.success) {
      return;
    }

    fetcher.submit(
      {
        id: props.id,
        data: parsed.data,
      },
      {
        action: "/api/cms/edit-author",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Box className={modalEditAuthorContainerStyle}>
        <Stack direction="column" justify="start" align="center" spacing={6}>
          <Typography textStyleVariant="size-20/bold" color="black/1">
            Редактирование автора
          </Typography>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Имя
            </Typography>

            <TextInput ref={firstnameRef} placeholder="Имя" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Фамилия
            </Typography>

            <TextInput ref={lastnameRef} placeholder="Фамилия" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Отчество
            </Typography>

            <TextInput ref={middlenameRef} placeholder="Отчество" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Дата рождения
            </Typography>

            <DateInput ref={dateOfBirthRef} placeholder="Дата рождения" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Биография
            </Typography>

            <Textarea ref={biographyRef} placeholder="Биография" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Ссылка на аватарку
            </Typography>

            <TextInput ref={avatarRef} placeholder="Ссылка на аватарку" />
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
