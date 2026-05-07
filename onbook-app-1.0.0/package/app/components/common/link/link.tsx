import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { ReactNode } from "react";

import clsx from "clsx";
import { NavLink } from "react-router";

import { linkRecipe } from "./link.css";

type VariantProps = RecipeVariants<typeof linkRecipe>;

type LinkProps = VariantProps & {
  to: string;
  children?: ReactNode;
};

export const Link = (props: LinkProps) => {
  return (
    <NavLink
      to={props.to}
      className={clsx([
        linkRecipe({ textStyleVariant: props.textStyleVariant }),
      ])}
    >
      {props.children}
    </NavLink>
  );
};
