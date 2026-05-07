import React from "react";
import { useFetcher } from "react-router";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Stack } from "~/components/layout/stack/stack.component";

type CreateGenreModalProps = {
  onClose: () => void;
};

export const CreateGenreModal = (props: CreateGenreModalProps) => {
  const fetcher = useFetcher();

  const nameRef = React.useRef<HTMLInputElement>(null);

  const handleCreate = React.useCallback(async () => {
    const nameInstance = nameRef.current;

    if (nameInstance == null) {
      return;
    }

    if (nameInstance.value.length < 1) {
      return;
    }

    fetcher.submit(
      {
        name: nameInstance.value,
      },
      {
        action: "/api/cms/create-genre",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Stack direction="column" justify="start" align="center" spacing={6}>
        <Typography textStyleVariant="size-20/bold" color="black/1">
          Добавить жанр
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

          <TextInput ref={nameRef} placeholder="Название" />
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
    </Modal>
  );
};
