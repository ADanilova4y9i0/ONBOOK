import { recipe } from "@vanilla-extract/recipes";

export const gridItem = recipe({
  variants: {
    columnStart: {
      1: { gridColumnStart: 1 },
      2: { gridColumnStart: 2 },
      3: { gridColumnStart: 3 },
      4: { gridColumnStart: 4 },
      5: { gridColumnStart: 5 },
      6: { gridColumnStart: 6 },
      7: { gridColumnStart: 7 },
      8: { gridColumnStart: 8 },
      9: { gridColumnStart: 9 },
      10: { gridColumnStart: 10 },
      11: { gridColumnStart: 11 },
      12: { gridColumnStart: 12 },
      auto: { gridColumnStart: "auto" },
      full: { gridColumnStart: "1" },
    },

    columnEnd: {
      1: { gridColumnEnd: 1 },
      2: { gridColumnEnd: 2 },
      3: { gridColumnEnd: 3 },
      4: { gridColumnEnd: 4 },
      5: { gridColumnEnd: 5 },
      6: { gridColumnEnd: 6 },
      7: { gridColumnEnd: 7 },
      8: { gridColumnEnd: 8 },
      9: { gridColumnEnd: 9 },
      10: { gridColumnEnd: 10 },
      11: { gridColumnEnd: 11 },
      12: { gridColumnEnd: 12 },
      13: { gridColumnEnd: 13 },
      auto: { gridColumnEnd: "auto" },
      full: { gridColumnEnd: "-1" },
    },

    rowStart: {
      1: { gridRowStart: 1 },
      2: { gridRowStart: 2 },
      3: { gridRowStart: 3 },
      4: { gridRowStart: 4 },
      5: { gridRowStart: 5 },
      6: { gridRowStart: 6 },
      auto: { gridRowStart: "auto" },
    },

    rowEnd: {
      1: { gridRowEnd: 1 },
      2: { gridRowEnd: 2 },
      3: { gridRowEnd: 3 },
      4: { gridRowEnd: 4 },
      5: { gridRowEnd: 5 },
      6: { gridRowEnd: 6 },
      7: { gridRowEnd: 7 },
      auto: { gridRowEnd: "auto" },
      full: { gridRowEnd: "-1" },
    },

    columnSpan: {
      1: { gridColumn: "span 1" },
      2: { gridColumn: "span 2" },
      3: { gridColumn: "span 3" },
      4: { gridColumn: "span 4" },
      5: { gridColumn: "span 5" },
      6: { gridColumn: "span 6" },
      7: { gridColumn: "span 7" },
      8: { gridColumn: "span 8" },
      9: { gridColumn: "span 9" },
      10: { gridColumn: "span 10" },
      11: { gridColumn: "span 11" },
      12: { gridColumn: "span 12" },
      full: { gridColumn: "1 / -1" },
    },

    rowSpan: {
      1: { gridRow: "span 1" },
      2: { gridRow: "span 2" },
      3: { gridRow: "span 3" },
      4: { gridRow: "span 4" },
      5: { gridRow: "span 5" },
      6: { gridRow: "span 6" },
      full: { gridRow: "1 / -1" },
    },

    area: {
      header: { gridArea: "header" },
      sidebar: { gridArea: "sidebar" },
      main: { gridArea: "main" },
      footer: { gridArea: "footer" },
    },

    align: {
      start: { alignSelf: "start" },
      center: { alignSelf: "center" },
      end: { alignSelf: "end" },
      stretch: { alignSelf: "stretch" },
      auto: { alignSelf: "auto" },
    },

    justify: {
      start: { justifySelf: "start" },
      center: { justifySelf: "center" },
      end: { justifySelf: "end" },
      stretch: { justifySelf: "stretch" },
      auto: { justifySelf: "auto" },
    },
  },
});
