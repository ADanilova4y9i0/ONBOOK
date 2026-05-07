import { clsx } from "clsx";
import { Suspense, type ReactNode } from "react";
import { Outlet } from "react-router";

import { Footer } from "~/components/composite/footer";
import { Navigation } from "~/components/composite/navigation";
import { Box } from "~/components/layout/box/box.component";
import { Stack } from "~/components/layout/stack/stack.component";
import { userContext } from "~/context/user.context";
import { userMiddleware } from "~/middlewares/user.middleware";
import { pagePaddingStyle } from "~/styles/global/page-padding.css";

import type { Route } from "./+types/layout";

type LayoutProps = {
  children?: ReactNode;
};

export const middleware: Route.MiddlewareFunction[] = [userMiddleware];

export async function loader(args: Route.LoaderArgs) {
  const user = args.context.get(userContext);

  return {
    user: user,
  };
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Navigation />
      <Stack
        direction="column"
        justify="between"
        align="start"
        horizontalFluid={true}
        spacing={10}
        style={{ minHeight: "100vh" }}
      >
        <Stack
          direction="column"
          justify="start"
          align="start"
          spacing={10}
          horizontalFluid={true}
          className={clsx([pagePaddingStyle])}
        >
          <Box horizontalFluid={true} paddingTop={36}>
            <Suspense>
              <Outlet />
            </Suspense>
          </Box>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
}
