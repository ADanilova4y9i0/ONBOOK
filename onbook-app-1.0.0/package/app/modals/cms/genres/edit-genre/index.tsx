import React from "react";
import { useFetcher } from "react-router";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

type EditGenreModalProps = {
  id: string;
  onClose: () => void;
};

export const EditGenreModal = (props: EditGenreModalProps) => {
  const fetcher = useFetcher();

  const nameRef = React.useRef<HTMLInputElement>(null);

  const handleEdit = React.useCallback(() => {
    const nameInstance = nameRef.current;

    if (nameInstance === null) {
      return;
    }

    if (nameInstance.value.length < 1) {
      return;
    }

    fetcher.submit(
      {
        id: props.id,
        name: nameInstance.value,
      },
      {
        action: "/api/cms/edit-genre",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Box paddingHorizontal={3} paddingVertical={5}>
        <Stack direction="column" justify="start" align="center" spacing={6}>
          <Typography textStyleVariant="size-20/bold" color="black/1">
            Редактирование жанра
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
            onClick={handleEdit}
          >
            Применить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
