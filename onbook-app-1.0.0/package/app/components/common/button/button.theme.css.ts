import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

export const buttonThemeVars = createGlobalThemeContract(
  {
    accent: {
      backgroundColor: "accent-background",
      color: "accent-color",

      hover: {
        backgroundColor: "accent-hover-background",
        color: "accent-hover-color",
      },

      disabled: {
        backgroundColor: "accent-disabled-background",
        color: "accent-disabled-color",

        hover: {
          backgroundColor: "accent-disabled-hover-background",
          color: "accent-disabled-hover-color",
        },
      },
    },

    primary: {
      backgroundColor: "primary-background",
      color: "primary-color",

      hover: {
        backgroundColor: "primary-hover-background",
        color: "primary-hover-color",
      },

      disabled: {
        backgroundColor: "primary-disabled-background",
        color: "primary-disabled-color",

        hover: {
          backgroundColor: "primary-disabled-hover-background",
          color: "primary-disabled-hover-color",
        },
      },
    },

    secondary: {
      backgroundColor: "secondary-background",
      color: "secondary-color",

      hover: {
        backgroundColor: "secondary-hover-background",
        color: "secondary-hover-color",
      },

      disabled: {
        backgroundColor: "secondary-disabled-background",
        color: "secondary-disabled-color",

        hover: {
          backgroundColor: "secondary-disabled-hover-background",
          color: "secondary-disabled-hover-color",
        },
      },
    },

    success: {
      backgroundColor: "success-background",
      color: "success-color",
    },

    error: {
      backgroundColor: "error-background",
      color: "error-color",
    },
  },
  (value) => `button-${value}`,
);

const baseBackgroundAccentColor = "#272727";
const baseAccentColor = "#cecece";

const hoveredBackgroundAccentColor = "#131313";
const hoveredAccentColor = "#f0f0f0";

const baseBackgroundColor = "#cecece";
const baseColor = "#242424";

const hoveredBackgroundColor = "#a7a7a7";
const hoveredColor = "#000000";

const disabledBackgroundColor = "#8f8f8f";
const disabledColor = "#353535";

createGlobalTheme(":root", buttonThemeVars, {
  accent: {
    backgroundColor: baseBackgroundAccentColor,
    color: baseAccentColor,

    hover: {
      backgroundColor: hoveredBackgroundAccentColor,
      color: hoveredAccentColor,
    },

    disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,

      hover: {
        backgroundColor: disabledBackgroundColor,
        color: disabledColor,
      },
    },
  },

  primary: {
    backgroundColor: baseBackgroundColor,
    color: baseColor,

    hover: {
      backgroundColor: baseBackgroundAccentColor,
      color: baseAccentColor,
    },

    disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,

      hover: {
        backgroundColor: disabledBackgroundColor,
        color: disabledColor,
      },
    },
  },

  secondary: {
    backgroundColor: baseBackgroundColor,
    color: baseColor,

    hover: {
      backgroundColor: hoveredBackgroundColor,
      color: hoveredColor,
    },

    disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,

      hover: {
        backgroundColor: disabledBackgroundColor,
        color: disabledColor,
      },
    },
  },

  success: {
    backgroundColor: "rgba(61, 188, 118, 0.15)",
    color: "rgb(61, 188, 118)",
  },

  error: {
    backgroundColor: "rgba(227, 67, 63, 0.15)",
    color: "rgb(227, 67, 63)",
  },
});
