import { recipe } from "@vanilla-extract/recipes";

export const stackRecipe = recipe({
  base: {
    display: "flex",
  },

  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      columnReverse: { flexDirection: "column-reverse" },
      rowReverse: { flexDirection: "row-reverse" },
    },

    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },

    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      evenly: { justifyContent: "space-evenly" },
    },

    wrap: {
      true: { flexWrap: "wrap" },
      false: {},
    },

    inline: {
      true: { display: "inline-flex" },
      false: {},
    },

    /**
     * @deprecated use horizontalFluid & verticalFluid
     */
    fluid: {
      true: { width: "100%" },
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

  defaultVariants: {
    direction: "column",
    wrap: false,
    inline: false,
    fluid: false,
    horizontalFluid: false,
    verticalFluid: false,
  },
});
