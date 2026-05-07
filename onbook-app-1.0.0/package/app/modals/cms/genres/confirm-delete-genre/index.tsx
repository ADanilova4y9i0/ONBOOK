import React from "react";
import { useFetcher } from "react-router";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { Typography } from "~/components/common/typography";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

type ConfirmDeleteGenreModalProps = {
  id: string;
  onClose: () => void;
};

export const ConfirmDeleteGenreModal = (
  props: ConfirmDeleteGenreModalProps,
) => {
  const fetcher = useFetcher();

  const handleDelete = React.useCallback(() => {
    fetcher.submit(
      {
        id: props.id,
      },
      {
        action: "/api/cms/delete-genre",
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
            Удалить жанр? 😭
          </Typography>

          <Button
            fluid={true}
            variant="accent"
            size="default"
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
