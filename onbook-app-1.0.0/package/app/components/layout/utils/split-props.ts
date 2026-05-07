export type SplitProps<T, K extends (readonly (keyof T)[])[]> = [
  ...{
    [P in keyof K]: P extends `${number}`
      ? Pick<T, Extract<K[P], readonly (keyof T)[]>[number]>
      : never;
  },
  {
    [P in keyof T as Exclude<P, K[number][number]>]: T[P];
  },
];

export function splitProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<any, any>,
  K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]],
>(props: T, ...keys: K): SplitProps<T, K> {
  const len = keys.length;

  const objects: Partial<T>[] = [];

  for (let i = 0; i <= len; i++) {
    objects[i] = {};
  }

  for (const propName of Object.getOwnPropertyNames(props) as Array<keyof T>) {
    let keyIndex = len;

    for (let index = 0; index < keys.length; index++) {
      if (keys[index].includes(propName)) {
        keyIndex = index;
        break;
      }
    }

    const desc = Object.getOwnPropertyDescriptor(props, propName);

    if (desc === undefined) {
      continue;
    }

    const isDefaultDesc =
      typeof desc.get !== "function" &&
      typeof desc.set !== "function" &&
      desc.enumerable === true &&
      desc.writable === true &&
      desc.configurable === true;

    if (isDefaultDesc) {
      objects[keyIndex][propName] = props[propName];
    } else {
      Object.defineProperty(objects[keyIndex], propName, desc);
    }
  }

  return objects as SplitProps<T, K>;
}
