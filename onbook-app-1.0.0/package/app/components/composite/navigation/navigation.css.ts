import { style } from "@vanilla-extract/css";

export const navigation = {
  style: style({
    zIndex: 9999,

    position: "fixed",
    top: 0,
    left: 0,

    background: "#ffffff",
    borderBottom: "solid 1px #E5E5E5",
  }),
  search: {
    style: style({
      width: "555px",
    }),
  },
};
