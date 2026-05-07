import clsx from "clsx";
import { useCallback, useRef } from "react";
import { useFetcher } from "react-router";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Stack } from "~/components/layout/stack/stack.component";

import { signInModalContainer } from "./sign-in-modal.css";

type SignInModalProps = {
  onClose: () => void;
};

export const SignInModal = (props: SignInModalProps) => {
  const fetcher = useFetcher();

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignIn = useCallback(async () => {
    const loginInstance = loginRef.current;

    if (loginInstance === null) {
      return;
    }

    const passwordInstance = passwordRef.current;

    if (passwordInstance === null) {
      return;
    }

    if (loginInstance.value.length < 1) {
      return;
    }

    if (passwordInstance.value.length < 1) {
      return;
    }

    fetcher.submit(
      {
        login: loginInstance.value,
        password: passwordInstance.value,
      },
      {
        action: "/api/auth/sign-in",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <Stack
        direction="column"
        justify="start"
        align="center"
        className={clsx(signInModalContainer.style)}
        spacing={6}
      >
        <Typography textStyleVariant="size-32/bold" color="black/1">
          Авторизация
        </Typography>

        <Stack
          horizontalFluid={true}
          direction="column"
          justify="start"
          align="start"
          spacing={4}
        >
          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Логин
            </Typography>

            <TextInput ref={loginRef} placeholder="логин" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Пароль
            </Typography>

            <TextInput ref={passwordRef} placeholder="пароль" />
          </Stack>
        </Stack>

        <Stack
          horizontalFluid={true}
          direction="row"
          justify="between"
          align="center"
          spacing={2}
        >
          <Button
            fluid={true}
            variant="primary"
            size="default"
            onClick={handleSignIn}
          >
            Войти
          </Button>
          <Button
            fluid={true}
            variant="secondary"
            size="default"
            onClick={props.onClose}
          >
            Отмена
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
