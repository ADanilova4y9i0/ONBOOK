import type { RecipeVariants } from "@vanilla-extract/recipes";

import { clsx } from "clsx";
import React, { type ElementType, forwardRef } from "react";

import { spacing } from "../utils/spacing";
import { grid } from "./grid.css";

type GridVariantProps = RecipeVariants<typeof grid>;

type GridProps<T extends ElementType = "div"> = GridVariantProps &
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    gap?: number;
    columnGap?: number;
    rowGap?: number;
  };

export const Grid = forwardRef<HTMLElement, GridProps>((inProps, ref) => {
  const {
    as = "div",
    gap,
    columnGap,
    rowGap,
    className,
    children,
    style,
    align,
    justify,
    alignContent,
    columns,
    rows,
    autoFlow,
    autoColumns,
    autoRows,
    ...props
  } = inProps;

  const variantProps: GridVariantProps = {
    align,
    justify,
    alignContent,
    columns,
    rows,
    autoFlow,
    autoColumns,
    autoRows,
  };

  const Component = as as ElementType;

  const mergedClassname = clsx(grid(variantProps), className);

  const gapStyles: React.CSSProperties = {};

  if (gap !== undefined) {
    gapStyles.gap = spacing(gap);
  }

  if (columnGap !== undefined) {
    gapStyles.columnGap = spacing(columnGap);
  }

  if (rowGap !== undefined) {
    gapStyles.rowGap = spacing(rowGap);
  }
  const mergedStyle = { ...(style || {}), ...gapStyles };

  return (
    <Component
      ref={ref}
      className={mergedClassname}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
});

Grid.displayName = "Grid";
