import { style } from "@vanilla-extract/css";

import { spacing } from "~/components/layout/utils/spacing";

export const pagePaddingStyle = style({
  paddingLeft: spacing(64),
  paddingRight: spacing(64),
});
