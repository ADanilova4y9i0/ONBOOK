import { type Child } from "./child";

export function flattenChildren(children: Child | Child[]): Child[] {
  if (Array.isArray(children)) {
    return children.flatMap((child) => flattenChildren(child));
  }

  if (
    children === null ||
    children === undefined ||
    typeof children === "boolean"
  ) {
    return [];
  }

  if (typeof children === "string" || typeof children === "number") {
    return [children];
  }

  return [children];
}
