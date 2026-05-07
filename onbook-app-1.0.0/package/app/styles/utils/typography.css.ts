import type { CSSProperties } from "@vanilla-extract/css";

export const textStyleVariants = {
  "size-12/light": {
    fontFamily: "inter",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "18px",
  },
  "size-12/regular": {
    fontFamily: "inter",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
  },
  "size-12/semibold": {
    fontFamily: "inter",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "18px",
  },
  "size-12/bold": {
    fontFamily: "inter",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "18px",
  },

  "size-14/light": {
    fontFamily: "inter",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "20px",
  },
  "size-14/regular": {
    fontFamily: "inter",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
  },
  "size-14/semibold": {
    fontFamily: "inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
  },
  "size-14/bold": {
    fontFamily: "inter",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "20px",
  },

  "size-16/light": {
    fontFamily: "inter",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: "22px",
  },
  "size-16/regular": {
    fontFamily: "inter",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",
  },
  "size-16/semibold": {
    fontFamily: "inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
  },
  "size-16/bold": {
    fontFamily: "inter",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "22px",
  },

  "size-20/bold": {
    fontFamily: "inter",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "26px",
  },

  "size-32/semibold": {
    fontFamily: "inter",
    fontSize: "32px",
    fontWeight: 600,
    lineHeight: "38px",
  },
  "size-32/bold": {
    fontFamily: "inter",
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "38px",
  },

  "size-48/semibold": {
    fontFamily: "inter",
    fontSize: "48px",
    fontWeight: 600,
    lineHeight: "54px",
  },
  "size-48/bold": {
    fontFamily: "inter",
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: "54px",
  },
} satisfies Record<string, CSSProperties>;
