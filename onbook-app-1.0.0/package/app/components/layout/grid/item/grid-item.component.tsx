import type { RecipeVariants } from "@vanilla-extract/recipes";

import { clsx } from "clsx";
import React, { type ElementType, forwardRef } from "react";

import { gridItem } from "./grid.css";

type GridItemVariantProps = RecipeVariants<typeof gridItem>;

type GridItemProps<T extends ElementType = "div"> = GridItemVariantProps &
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

export const GridItem = forwardRef<HTMLElement, GridItemProps>(
  (inProps, ref) => {
    const {
      as = "div",
      className,
      children,
      columnStart,
      columnEnd,
      rowStart,
      rowEnd,
      columnSpan,
      rowSpan,
      area,
      align,
      justify,
      ...props
    } = inProps;

    const variantProps: GridItemVariantProps = {
      columnStart,
      columnEnd,
      rowStart,
      rowEnd,
      columnSpan,
      rowSpan,
      area,
      align,
      justify,
    };

    const Component = as as ElementType;
    const mergedClassname = clsx(gridItem(variantProps), className);

    return (
      <Component ref={ref} className={mergedClassname} {...props}>
        {children}
      </Component>
    );
  },
);

GridItem.displayName = "GridItem";
