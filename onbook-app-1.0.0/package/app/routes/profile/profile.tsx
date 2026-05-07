import { useCallback } from "react";
import { Link, Outlet, redirect, useFetcher } from "react-router";

import { Avatar } from "~/components/common/avatar";
import { Button } from "~/components/common/button/button.component";
import { Typography } from "~/components/common/typography";
import { Stack } from "~/components/layout/stack/stack.component";
import { userContext } from "~/context/user.context";
import { authMiddleware } from "~/middlewares/auth.middleware";

import type { Route } from "./+types/profile";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader(args: Route.LoaderArgs) {
  const user = args.context.get(userContext);

  if (user === null) {
    throw redirect("/");
  }

  return {
    user: user,
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "OnBook | Profile" }];
}

export default function Profile(props: Route.ComponentProps) {
  const fetcher = useFetcher();

  const handleLogout = useCallback(() => {
    fetcher.submit(
      {},
      {
        action: "/api/auth/logout",
        method: "POST",
        encType: "application/json",
      },
    );
  }, []);

  return (
    <Stack
      direction="column"
      justify="start"
      align="start"
      horizontalFluid={true}
      spacing={16}
    >
      <Stack
        horizontalFluid={true}
        direction="row"
        justify="between"
        align="center"
      >
        <Stack
          direction="row"
          justify="start"
          align="center"
          spacing={9}
          horizontalFluid={true}
        >
          <Avatar
            size="size-64"
            avatar={{
              type: "url",
              url:
                props.loaderData.user.avatar ?? "https://placehold.co/100x100",
            }}
          />

          <Stack direction="column" justify="center" align="start">
            <Typography textStyleVariant="size-16/bold" color="black/1">
              Профиль пользователя{" "}
              <Typography textStyleVariant="size-14/light" color="gray/1">
                {props.loaderData.user.id}
              </Typography>
            </Typography>
            <Typography textStyleVariant="size-16/regular" color="black/1">
              {props.loaderData.user.login}
            </Typography>
          </Stack>
        </Stack>

        <Button variant="accent" size="small" onClick={handleLogout}>
          Выйти
        </Button>
      </Stack>

      <Stack
        direction="row"
        justify="start"
        align="start"
        spacing={24}
        horizontalFluid={true}
      >
        <Stack
          style={{ flex: "none" }}
          direction="column"
          justify="start"
          align="start"
          spacing={12}
        >
          <Stack
            style={{ flex: "none" }}
            direction="column"
            justify="start"
            align="start"
            spacing={6}
          >
            <Typography textStyleVariant="size-16/bold" color="black/1">
              Отслеживание
            </Typography>

            <Stack
              style={{ flex: "none" }}
              direction="column"
              justify="start"
              align="start"
              spacing={4}
            >
              <Link to={"/profile"}>
                <Typography textStyleVariant="size-14/semibold" color="gray/1">
                  К прочтению
                </Typography>
              </Link>

              <Link to={"/profile/reading"}>
                <Typography textStyleVariant="size-14/semibold" color="gray/1">
                  Читаю
                </Typography>
              </Link>

              <Link to={"/profile/completed"}>
                <Typography textStyleVariant="size-14/semibold" color="gray/1">
                  Прочитанные
                </Typography>
              </Link>

              <Link to={"/profile/on-hold"}>
                <Typography textStyleVariant="size-14/semibold" color="gray/1">
                  Люимое
                </Typography>
              </Link>

              <Link to={"/profile/dropped"}>
                <Typography textStyleVariant="size-14/semibold" color="gray/1">
                  Брошено
                </Typography>
              </Link>
            </Stack>
          </Stack>

          {props.loaderData.user.isAdmin && (
            <Stack
              style={{ flex: "none" }}
              direction="column"
              justify="start"
              align="start"
              spacing={6}
            >
              <Typography textStyleVariant="size-16/bold" color="black/1">
                Управление
              </Typography>

              <Stack
                style={{ flex: "none" }}
                direction="column"
                justify="start"
                align="start"
                spacing={4}
              >
                <Link to={"/profile/cms/genres"}>
                  <Typography textStyleVariant="size-14/regular" color="gray/1">
                    Жанры
                  </Typography>
                </Link>

                <Link to={"/profile/cms/authors"}>
                  <Typography textStyleVariant="size-14/regular" color="gray/1">
                    Авторы
                  </Typography>
                </Link>

                <Link to={"/profile/cms/books"}>
                  <Typography textStyleVariant="size-14/regular" color="gray/1">
                    Книги
                  </Typography>
                </Link>

                {/* TODO */}
                {/* <Typography textStyleVariant="size-14/regular" color="gray/1">
                  Адаптации
                </Typography> */}
              </Stack>
            </Stack>
          )}
        </Stack>

        <Outlet />
      </Stack>
    </Stack>
  );
}
