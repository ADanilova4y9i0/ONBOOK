import clsx from "clsx";
import { forwardRef } from "react";

import { Stack } from "~/components/layout/stack/stack.component";

import { textareaContainerStyle, textareaStyle } from "./textarea.css";

type TextareaProps = {
  placeholder?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <Stack
        direction="row"
        justify="start"
        align="center"
        className={clsx(textareaContainerStyle)}
        spacing={1}
      >
        <textarea
          ref={ref}
          className={clsx(textareaStyle)}
          placeholder={props.placeholder}
        />
      </Stack>
    );
  },
);
