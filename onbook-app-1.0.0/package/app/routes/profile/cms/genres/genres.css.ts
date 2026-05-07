import { style } from "@vanilla-extract/css";

import { spacing } from "~/components/layout/utils/spacing";

export const cmsGenresGenreContainerStyle = style({
  background: "#f5f5f5",
  borderRadius: spacing(4),
});

export const cmsGenresGenreContainerDividerStyle = style({
  width: "100%",
  height: "1px",

  background: "#bdbdbd",
});
