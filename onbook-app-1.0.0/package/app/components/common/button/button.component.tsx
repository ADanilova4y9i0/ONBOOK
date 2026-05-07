import { type RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";
import React from "react";

import { buttonRecipe } from "./button.css";

type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

export type ButtonProps = ButtonVariants &
  React.ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (inProps, ref) => {
    const { children, className, variant, size, disabled, fluid, ...props } =
      inProps;

    return (
      <button
        {...props}
        className={clsx(
          buttonRecipe({
            variant: variant,
            size: size,
            disabled: disabled,
            fluid: fluid,
          }),
          className,
        )}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
