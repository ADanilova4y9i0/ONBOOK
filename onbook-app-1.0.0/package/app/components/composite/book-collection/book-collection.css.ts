import { style } from "@vanilla-extract/css";

import { spacing } from "~/components/layout/utils/spacing";

export const bookCollectionList = {
  style: style({
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: `${spacing(6)} ${spacing(4)}`,

    width: "100%",
  }),
  item: {
    style: style({
      minWidth: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }),
    imageWrapper: {
      style: style({
        width: "100%",
        aspectRatio: "6 / 9",
        position: "relative",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "12px",
      }),
      image: {
        style: style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          objectFit: "cover",
          display: "block",

          cursor: "pointer",
        }),
      },
    },
  },
};
