import { recipe } from "@vanilla-extract/recipes";

import { spacing } from "~/components/layout/utils/spacing";
import { textStyleVariants } from "~/styles/utils/typography.css";

import { buttonThemeVars } from "./button.theme.css";

export const buttonRecipe = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: spacing(1),

    minWidth: "fit-content",
    borderRadius: "12px",
    width: "unset",

    cursor: "pointer",
  },
  variants: {
    variant: {
      accent: {
        background: buttonThemeVars.accent.backgroundColor,
        color: buttonThemeVars.accent.color,

        ...textStyleVariants["size-14/bold"],

        ":hover": {
          background: buttonThemeVars.accent.hover.backgroundColor,
          color: buttonThemeVars.accent.hover.color,
        },
      },

      primary: {
        background: buttonThemeVars.primary.backgroundColor,
        color: buttonThemeVars.primary.color,

        ...textStyleVariants["size-14/bold"],

        ":hover": {
          background: buttonThemeVars.primary.hover.backgroundColor,
          color: buttonThemeVars.primary.hover.color,
        },
      },

      secondary: {
        background: buttonThemeVars.secondary.backgroundColor,
        color: buttonThemeVars.secondary.color,

        ...textStyleVariants["size-14/bold"],

        ":hover": {
          background: buttonThemeVars.secondary.hover.backgroundColor,
          color: buttonThemeVars.secondary.hover.color,
        },
      },

      plain: {
        ...textStyleVariants["size-14/bold"],
      },

      success: {
        ...textStyleVariants["size-14/bold"],

        color: buttonThemeVars.success.color,
      },

      error: {
        ...textStyleVariants["size-14/bold"],

        color: buttonThemeVars.error.color,
      },
    },
    size: {
      plain: {
        padding: "none",
        borderRadius: "none",
      },
      small: {
        padding: `${spacing(2.5)} ${spacing(3.5)}`,
        borderRadius: spacing(3.5),
      },
      default: {
        padding: `${spacing(3.5)} ${spacing(5)}`,
        borderRadius: spacing(2.5),
      },
    },
    disabled: {
      true: {
        cursor: "default",
      },
    },
    fluid: {
      true: {
        width: "100%",
      },
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "default",
    disabled: false,
    fluid: false,
  },
  compoundVariants: [
    {
      variants: {
        variant: "accent",
        disabled: true,
      },
      style: {
        background: buttonThemeVars.accent.disabled.backgroundColor,
        color: buttonThemeVars.accent.disabled.color,

        ":hover": {
          background: buttonThemeVars.accent.disabled.hover.backgroundColor,
          color: buttonThemeVars.accent.disabled.hover.color,
        },
      },
    },
    {
      variants: {
        variant: "primary",
        disabled: true,
      },
      style: {
        background: buttonThemeVars.primary.disabled.backgroundColor,
        color: buttonThemeVars.primary.disabled.color,

        ":hover": {
          background: buttonThemeVars.primary.disabled.hover.backgroundColor,
          color: buttonThemeVars.primary.disabled.hover.color,
        },
      },
    },
    {
      variants: {
        variant: "secondary",
        disabled: true,
      },
      style: {
        background: buttonThemeVars.secondary.disabled.backgroundColor,
        color: buttonThemeVars.secondary.disabled.color,

        ":hover": {
          background: buttonThemeVars.secondary.disabled.hover.backgroundColor,
          color: buttonThemeVars.secondary.disabled.hover.color,
        },
      },
    },
  ],
});
