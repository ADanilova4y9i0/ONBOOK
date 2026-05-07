import { recipe } from "@vanilla-extract/recipes";

import { textStyleVariants } from "~/styles/utils/typography.css";

export const typographyRecipe = recipe({
  base: {
    fontFamily: "Inter",
    fontWeight: "unset",
    fontSize: "unset",

    lineHeight: "unset",

    color: "unset",
  },
  variants: {
    textStyleVariant: textStyleVariants,

    color: {
      "black/1": {
        color: "#030213",
      },

      "gray/1": {
        color: "#717182",
      },
    },
  },
});
