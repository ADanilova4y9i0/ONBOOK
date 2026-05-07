import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";

import type { Child } from "~/components/layout/utils/child";

import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";

import { modal } from "./modal.css";

type ModalProps = {
  onClose: () => void;
  children?: Child;
};

export const Modal = (props: ModalProps) => {
  const root = document.querySelector("body");

  React.useEffect(() => {
    if (root === null) {
      return;
    }

    const overflow = root.style.overflow;

    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = overflow;
    };
  }, [root]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget !== event.target) {
      return;
    }

    props.onClose();
  };

  if (root === null) {
    throw new Error("root not found");
  }

  return createPortal(
    <Stack
      justify="center"
      align="center"
      className={clsx(modal.style)}
      onClick={handleClick}
    >
      <Box padding={4} borderRadius={4} className={clsx(modal.container.style)}>
        {props.children}
      </Box>
    </Stack>,
    root,
  );
};
