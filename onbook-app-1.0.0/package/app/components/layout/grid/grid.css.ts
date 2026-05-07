import { recipe } from "@vanilla-extract/recipes";

export const grid = recipe({
  base: {
    display: "grid",
  },

  variants: {
    columns: {
      1: { gridTemplateColumns: "repeat(1, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, 1fr)" },
      3: { gridTemplateColumns: "repeat(3, 1fr)" },
      4: { gridTemplateColumns: "repeat(4, 1fr)" },
      5: { gridTemplateColumns: "repeat(5, 1fr)" },
      6: { gridTemplateColumns: "repeat(6, 1fr)" },
      12: { gridTemplateColumns: "repeat(12, 1fr)" },

      auto: {
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },

    rows: {
      1: { gridTemplateRows: "repeat(1, 1fr)" },
      2: { gridTemplateRows: "repeat(2, 1fr)" },
      3: { gridTemplateRows: "repeat(3, 1fr)" },
      4: { gridTemplateRows: "repeat(4, 1fr)" },
      6: { gridTemplateRows: "repeat(6, 1fr)" },
    },

    autoFlow: {
      row: { gridAutoFlow: "row" },
      column: { gridAutoFlow: "column" },
      "row dense": { gridAutoFlow: "row dense" },
      "column dense": { gridAutoFlow: "column dense" },
    },

    autoColumns: {
      auto: { gridAutoColumns: "auto" },
      min: { gridAutoColumns: "min-content" },
      max: { gridAutoColumns: "max-content" },
      fr: { gridAutoColumns: "minmax(0, 1fr)" },
    },

    autoRows: {
      auto: { gridAutoRows: "auto" },
      min: { gridAutoRows: "min-content" },
      max: { gridAutoRows: "max-content" },
      fr: { gridAutoRows: "minmax(0, 1fr)" },
    },

    align: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },

    justify: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
      stretch: { justifyContent: "stretch" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      evenly: { justifyContent: "space-evenly" },
    },

    alignContent: {
      start: { alignContent: "start" },
      center: { alignContent: "center" },
      end: { alignContent: "end" },
      stretch: { alignContent: "stretch" },
      between: { alignContent: "space-between" },
      around: { alignContent: "space-around" },
    },
  },

  defaultVariants: {
    align: "stretch",
    justify: "start",
  },
});
