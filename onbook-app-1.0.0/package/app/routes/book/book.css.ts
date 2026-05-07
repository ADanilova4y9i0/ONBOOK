import { style } from "@vanilla-extract/css";

export const keyValue = {
  style: style({
    display: "flex",
    alignItems: "baseline",
    width: "100%",
  }),
  title: {
    style: style({
      whiteSpace: "nowrap",
      flexShrink: 0,
    }),
  },
  dots: {
    style: style({
      flexGrow: 1,
      borderBottom: "1px dotted #ccc",
      margin: "0 4px",
      minWidth: "20px",
    }),
  },
  value: {
    style: style({
      whiteSpace: "nowrap",
      flexShrink: 0,
    }),
  },
};
