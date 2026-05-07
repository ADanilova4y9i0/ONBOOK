import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { CSSProperties, ReactNode } from "react";

import clsx from "clsx";

import { typographyRecipe } from "./typography.css";

type VariantProps = RecipeVariants<typeof typographyRecipe>;

type TypographyProps = VariantProps & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Typography = (props: TypographyProps) => {
  return (
    <span
      className={clsx(
        typographyRecipe({
          textStyleVariant: props.textStyleVariant,
          color: props.color,
        }),
        props.className,
      )}
      style={props.style}
    >
      {props.children}
    </span>
  );
};
