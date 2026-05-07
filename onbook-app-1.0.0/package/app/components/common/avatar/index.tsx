import type { RecipeVariants } from "@vanilla-extract/recipes";

import clsx from "clsx";

import { avatar } from "./avatar.css";

type VariantProps = RecipeVariants<typeof avatar.style>;

type Avatar =
  | {
      type: "url";
      url: string;
    }
  | {
      type: "unset";
    };

type AvatarProps = VariantProps & {
  avatar: Avatar;
};

export const Avatar = (props: AvatarProps) => {
  switch (props.avatar.type) {
    case "url": {
      return (
        <div className={clsx(avatar.style({ size: props.size }))}>
          <img src={props.avatar.url} className={clsx(avatar.image.style)} />
        </div>
      );
    }
    case "unset": {
      return (
        <div className={clsx(avatar.style({ size: props.size }))}>{/*  */}</div>
      );
    }
  }
};
