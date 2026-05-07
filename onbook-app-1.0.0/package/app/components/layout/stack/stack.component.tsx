import type { RecipeVariants } from "@vanilla-extract/recipes";

import { clsx } from "clsx";
import React, { type ElementType, forwardRef } from "react";

import { joinChildren } from "../utils/join-children";
import { spacing } from "../utils/spacing";
import { splitProps } from "../utils/split-props";
import { stackRecipe } from "./stack.css";

type StackVariantProps = RecipeVariants<typeof stackRecipe>;

type StackProps<T extends ElementType = "div"> = StackVariantProps &
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    spacing?: number;
    divider?: React.ReactElement;
  };

export const Stack = forwardRef<HTMLElement, StackProps>((inProps, ref) => {
  const [variantProps, localProps, props] = splitProps(
    inProps,
    stackRecipe.variants(),
    ["as", "spacing", "className", "children", "style", "divider", "spacing"],
  );

  const Component = (localProps.as ?? "div") as ElementType;

  const mergedClassname = clsx(stackRecipe(variantProps), localProps.className);

  const spacingStyle = localProps.spacing
    ? { gap: spacing(localProps.spacing) }
    : undefined;
  const mergedStyle = { ...(localProps.style || {}), ...(spacingStyle || {}) };

  const content =
    localProps.divider === undefined
      ? localProps.children
      : joinChildren(localProps.children, localProps.divider);

  return (
    <Component
      ref={ref}
      className={mergedClassname}
      style={mergedStyle}
      {...props}
    >
      {content}
    </Component>
  );
});

Stack.displayName = "Stack";
