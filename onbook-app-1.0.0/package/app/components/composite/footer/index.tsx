export const Footer = () => {
  return <p></p>; /*
  return (
    <Box
      horizontalFluid={true}
      paddingVertical={8}
      className={clsx(footerStyle, pagePaddingStyle)}
    >
      <Stack
        direction="column"
        justify="start"
        align="center"
        horizontalFluid={true}
      >
        <Stack
          direction="row"
          justify="between"
          align="start"
          horizontalFluid={true}
        >
          <Stack direction="column" justify="start" align="start" spacing={2}>
            <Stack direction="row" justify="start" align="center" spacing={2}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.45 24.4999C10.7345 24.4999 11.9847 24.6479 13.2008 24.9439C14.417 25.2396 15.6168 25.6834 16.8 26.2751V10.6751C15.7083 9.97512 14.5323 9.43762 13.272 9.06262C12.0118 8.68762 10.7378 8.50012 9.45 8.50012C8.51675 8.50012 7.598 8.60838 6.69375 8.82488C5.7895 9.04163 4.89162 9.325 4.00012 9.675V25.4749C4.80838 25.1416 5.68538 24.8959 6.63113 24.7376C7.57713 24.5791 8.51675 24.4999 9.45 24.4999ZM19.3001 26.2751C20.5001 25.6834 21.6855 25.2396 22.8563 24.9439C24.027 24.6479 25.2583 24.4999 26.55 24.4999C27.4833 24.4999 28.4311 24.5749 29.3936 24.7249C30.3561 24.8749 31.2249 25.0833 31.9999 25.35V9.675C31.1584 9.275 30.2745 8.97913 29.3483 8.78738C28.422 8.59588 27.4893 8.50012 26.55 8.50012C25.2583 8.50012 23.9999 8.68762 22.7749 9.06262C21.5499 9.43762 20.3916 9.97512 19.3001 10.6751V26.2751ZM18.0499 30C16.7999 29.05 15.4416 28.3166 13.9751 27.7999C12.5084 27.2834 11 27.0251 9.45 27.0251C8.491 27.0251 7.54913 27.1459 6.62437 27.3874C5.69987 27.6291 4.79175 27.9416 3.9 28.3249C3.34 28.5999 2.8 28.5708 2.28 28.2375C1.76 27.9043 1.5 27.4251 1.5 26.8001V9.19988C1.5 8.85838 1.58125 8.54175 1.74375 8.25C1.90625 7.95825 2.15 7.73325 2.475 7.575C3.55825 7.04175 4.6865 6.64588 5.85975 6.38738C7.033 6.12913 8.22975 6 9.45 6C10.9833 6 12.477 6.20413 13.9313 6.61238C15.3855 7.02088 16.7584 7.64175 18.0499 8.475C19.3249 7.64175 20.6811 7.02088 22.1186 6.61238C23.5561 6.20413 25.0333 6 26.55 6C27.7645 6 28.9556 6.12913 30.1234 6.38738C31.2911 6.64588 32.4166 7.04175 33.4999 7.575C33.8249 7.73325 34.0729 7.95825 34.2439 8.25C34.4146 8.54175 34.5 8.85838 34.5 9.19988V26.8001C34.5 27.4566 34.2313 27.9561 33.6938 28.2986C33.1563 28.6411 32.6166 28.6499 32.0749 28.3249C31.1999 27.9249 30.3001 27.6083 29.3756 27.375C28.4509 27.1418 27.509 27.0251 26.55 27.0251C25 27.0251 23.5084 27.2876 22.0751 27.8126C20.6416 28.3376 19.2999 29.0668 18.0499 30Z"
                  fill="#030213"
                />
              </svg>

              <Typography textStyleVariant="size-16/bold" color="black/1">
                ONBOOK
              </Typography>
            </Stack>

            <Typography textStyleVariant="size-14/regular" color="gray/1">
              Ваш персональный гид в мире литературы
            </Typography>
          </Stack>

          <Stack direction="column" justify="start" align="start" spacing={4}>
            <Typography textStyleVariant="size-16/bold" color="black/1">
              Навигация
            </Typography>

            <Stack direction="column" justify="start" align="start" spacing={2}>
              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Каталог книг
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Авторы
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Экстранизация
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Рекомендации
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" justify="start" align="start" spacing={4}>
            <Typography textStyleVariant="size-16/bold" color="black/1">
              Сообщество
            </Typography>

            <Stack direction="column" justify="start" align="start" spacing={2}>
              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Отзывы
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Рейтинги
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Обсуждения
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Блог
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" justify="start" align="start" spacing={4}>
            <Typography textStyleVariant="size-16/bold" color="black/1">
              Информация
            </Typography>

            <Stack direction="column" justify="start" align="start" spacing={2}>
              <Typography textStyleVariant="size-14/regular" color="gray/1">
                О проекте
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Контакты
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Помощь
              </Typography>

              <Typography textStyleVariant="size-14/regular" color="gray/1">
                Правила
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box paddingTop={16}>
          <Typography textStyleVariant="size-14/regular" color="gray/1">
            © 2026 ONBOOK. Все права защищены.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );*/
};
