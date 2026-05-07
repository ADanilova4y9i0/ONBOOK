import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { spacing } from "~/components/layout/utils/spacing";

export const avatar = {
  style: recipe({
    base: {
      flex: "none",

      borderRadius: "100%",
      outline: `solid 1px #e2e2e2`,

      background: "#ffffff",

      overflow: "hidden",
    },
    variants: {
      size: {
        "size-16": {
          width: spacing(4),
          height: spacing(4),
        },
        "size-32": {
          width: spacing(8),
          height: spacing(8),
        },
        "size-48": {
          width: spacing(12),
          height: spacing(12),
        },
        "size-64": {
          width: spacing(16),
          height: spacing(16),
        },
        "size-128": {
          width: spacing(32),
          height: spacing(32),
        },
      },
    },
  }),
  image: {
    style: style({
      width: "100%",
      height: "100%",
    }),
  },
};
