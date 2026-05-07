import type React from "react";
import type { ElementType } from "react";

type PropsType = object;

export type WithElementProps<
  Props extends PropsType,
  T extends ElementType,
> = Props & Omit<React.ComponentPropsWithoutRef<T>, keyof Props>;

export type PolymorphicProps<
  Props extends PropsType,
  T extends ElementType = "div",
> = { as?: T } & WithElementProps<Props, T>;
