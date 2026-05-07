import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const boxBaseStyle = style({
  position: "relative",
  minHeight: "0px",
});

export const boxRecipe = recipe({
  base: boxBaseStyle,
  variants: {
    inline: {
      true: { display: "inline" },
      false: {},
    },

    fixed: {
      true: { flex: "none" },
    },

    fluid: {
      true: { width: "100%", height: "100%" },
      false: {},
    },

    horizontalFluid: {
      true: { width: "100%" },
      false: {},
    },

    verticalFluid: {
      true: { height: "100%" },
      false: {},
    },

    grow: {
      true: {
        flexGrow: 1,
        minHeight: 0,
        minWidth: 0,
      },
    },
  },
});
