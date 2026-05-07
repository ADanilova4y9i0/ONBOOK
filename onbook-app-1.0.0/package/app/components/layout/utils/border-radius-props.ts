import type { CSSProperties } from "react";

import { spacing } from "./spacing";

export type BorderRadiusProps = {
  borderRadius?: number;
};

export const BorderRadiusProps = {
  keys: [
    "borderRadius",
  ] as const satisfies readonly (keyof BorderRadiusProps)[],

  merge(
    styles: CSSProperties | undefined,
    props: BorderRadiusProps,
  ): CSSProperties {
    const result: CSSProperties & {
      [key: `--${string}`]: string | number | undefined;
    } = { ...styles };

    if (props.borderRadius !== undefined) {
      const borderRadiusSpacing = spacing(props.borderRadius);

      result.borderRadius = borderRadiusSpacing;
    }

    return result;
  },
};
