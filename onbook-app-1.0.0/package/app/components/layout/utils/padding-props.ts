import type { CSSProperties } from "react";

import { createGlobalVar } from "@vanilla-extract/css";

import { spacing } from "./spacing";

export const paddingLeftToken = "padding-left";
export const paddingLeftVar = createGlobalVar(paddingLeftToken);

export const paddingRightToken = "padding-right";
export const paddingRightVar = createGlobalVar(paddingRightToken);

export type PaddingProps = {
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
};

export type PaddingStyle = {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export const PaddingProps = {
  keys: [
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "paddingVertical",
    "paddingHorizontal",
  ] as const satisfies readonly (keyof PaddingProps)[],

  merge(styles: CSSProperties | undefined, props: PaddingProps): CSSProperties {
    const result: CSSProperties & {
      [key: `--${string}`]: string | number | undefined;
    } = { ...styles };
    const {
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingVertical,
      paddingHorizontal,
    } = props;

    if (padding !== undefined) {
      const paddingSpacing = spacing(padding);

      result.paddingTop = paddingSpacing;
      result.paddingRight = paddingSpacing;
      result.paddingBottom = paddingSpacing;
      result.paddingLeft = paddingSpacing;

      result[`--${paddingRightToken}`] = paddingSpacing;
      result[`--${paddingLeftToken}`] = paddingSpacing;
    }

    if (paddingVertical !== undefined) {
      result.paddingTop = spacing(paddingVertical);
      result.paddingBottom = spacing(paddingVertical);
    }

    if (paddingHorizontal !== undefined) {
      const paddingHorizontalSpacing = spacing(paddingHorizontal);

      result.paddingLeft = paddingHorizontalSpacing;
      result.paddingRight = paddingHorizontalSpacing;

      result.paddingRight = paddingHorizontalSpacing;
      result[`--${paddingRightToken}`] = paddingHorizontalSpacing;
      result[`--${paddingLeftToken}`] = paddingHorizontalSpacing;
    }

    if (paddingTop !== undefined) {
      result.paddingTop = spacing(paddingTop);
    }

    if (paddingRight !== undefined) {
      const paddingHorizontalSpacing = spacing(paddingRight);
      result.paddingRight = paddingHorizontalSpacing;
      result[`--${paddingRightToken}`] = paddingHorizontalSpacing;
    }

    if (paddingBottom !== undefined) {
      result.paddingBottom = spacing(paddingBottom);
    }

    if (paddingLeft !== undefined) {
      const paddingHorizontalSpacing = spacing(paddingLeft);
      result.paddingLeft = paddingHorizontalSpacing;
      result[`--${paddingLeftToken}`] = paddingHorizontalSpacing;
    }

    return result;
  },
};
