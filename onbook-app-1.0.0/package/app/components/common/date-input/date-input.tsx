import clsx from "clsx";
import { forwardRef } from "react";

import type { Child } from "~/components/layout/utils/child";

import { Stack } from "~/components/layout/stack/stack.component";

import { dateInputContainerStyle, dateInputStyle } from "./date-input.css";

type DateInputProps = {
  placeholder?: string;
  left?: Child;
  right?: Child;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => {
    return (
      <Stack
        direction="row"
        justify="start"
        align="center"
        className={clsx(dateInputContainerStyle)}
        spacing={1}
      >
        {props.left}
        <input
          type="date"
          ref={ref}
          className={clsx(dateInputStyle)}
          placeholder={props.placeholder}
        />
        {props.right}
      </Stack>
    );
  },
);
