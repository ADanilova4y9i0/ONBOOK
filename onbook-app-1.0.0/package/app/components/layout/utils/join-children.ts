import { type Child } from "./child";
import { flattenChildren } from "./flatten-children";

export function joinChildren(
  children: Child | Child[],
  separator: Child,
): Child[] {
  const array = flattenChildren(children);

  const output: Child[] = [];

  for (const [index, child] of array.entries()) {
    output.push(child);

    if (index < array.length - 1) {
      output.push(separator);
    }
  }

  return output;
}
