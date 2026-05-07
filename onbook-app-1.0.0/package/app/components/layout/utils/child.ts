import type React from "react";

export type Child<P = unknown> = unknown extends P
  ? React.HTMLAttributes<"div">["children"]
  : React.ReactElement<P>;
