import { recipe } from "@vanilla-extract/recipes";

import { textStyleVariants } from "~/styles/utils/typography.css";

export const linkRecipe = recipe({
  base: {
    fontFamily: "Inter",
    fontWeight: "unset",
    fontSize: "unset",

    lineHeight: "unset",

    color: "#424242",

    cursor: "pointer",

    textDecoration: "none",

    ":hover": {
      color: "#1b1b1b",
    },
  },
  variants: {
    textStyleVariant: textStyleVariants,
  },
});
