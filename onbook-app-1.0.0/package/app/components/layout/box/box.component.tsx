import type { RecipeVariants } from "@vanilla-extract/recipes";

import { clsx } from "clsx";
import { type ElementType, forwardRef } from "react";

import type { Child } from "../utils/child";
import type { PolymorphicProps } from "../utils/polymorphic";

import { BorderRadiusProps } from "../utils/border-radius-props";
import { PaddingProps } from "../utils/padding-props";
import { splitProps } from "../utils/split-props";
import { boxRecipe } from "./box.css";

type BoxVariantProps = RecipeVariants<typeof boxRecipe>;

type BoxProps<T extends ElementType = "div"> = PolymorphicProps<
  PaddingProps &
    BorderRadiusProps &
    BoxVariantProps & {
      children?: Child;
    },
  T
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Box = forwardRef<any, BoxProps>((inProps, ref) => {
  const [local, variantProps, paddingProps, borderRadiusProps, props] =
    splitProps(
      inProps,
      ["as", "children", "className", "style"],
      boxRecipe.variants(),
      PaddingProps.keys,
      BorderRadiusProps.keys,
    );

  const Component: ElementType = local.as ?? "div";

  const mergedClassname = clsx(boxRecipe(variantProps), local.className);

  const mergedStyles = BorderRadiusProps.merge(
    PaddingProps.merge(local.style, paddingProps),
    borderRadiusProps,
  );

  return (
    <Component
      ref={ref}
      style={mergedStyles}
      className={mergedClassname}
      {...props}
    >
      {local.children}
    </Component>
  );
});

Box.displayName = "Box";
