import { style } from "@vanilla-extract/css";

export const modal = {
  style: style({
    zIndex: 99999999,

    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    background: "#00000096",
  }),

  container: {
    style: style({
      background: "#FCFCFC",
      boxShadow: `1px 1px 10px #00000096`,
    }),
  },
};
