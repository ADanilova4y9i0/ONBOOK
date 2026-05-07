import clsx from "clsx";
import React, { forwardRef } from "react";

import type { Child } from "~/components/layout/utils/child";

import { Stack } from "~/components/layout/stack/stack.component";

import { textInputContainerStyle, textInputStyle } from "./text-input.css";

type TextInputProps = {
  placeholder?: string;
  left?: Child;
  right?: Child;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <Stack
        direction="row"
        justify="start"
        align="center"
        className={clsx(textInputContainerStyle)}
        spacing={1}
      >
        {props.left}
        <input
          ref={ref}
          className={clsx(textInputStyle)}
          placeholder={props.placeholder}
          onKeyUp={props.onKeyUp}
        />
        {props.right}
      </Stack>
    );
  },
);
