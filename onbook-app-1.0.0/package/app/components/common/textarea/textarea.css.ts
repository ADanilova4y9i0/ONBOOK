import { style } from "@vanilla-extract/css";

import { spacing } from "~/components/layout/utils/spacing";
import { textStyleVariants } from "~/styles/utils/typography.css";

export const textareaContainerStyle = style({
  width: "100%",

  padding: spacing(3.5),

  borderRadius: spacing(3),

  color: "#1d1d1d",
  background: "#ececec",
  outline: `solid 1px #e2e2e2`,

  ...textStyleVariants["size-16/regular"],

  "::placeholder": {
    ...textStyleVariants["size-16/regular"],
    color: "#616161",
  },
});

export const textareaStyle = style({
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  resize: "none",
});
