import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { useFetcher } from "react-router";

import { Button } from "~/components/common/button/button.component";
import { Modal } from "~/components/common/modal";
import { TextInput } from "~/components/common/text-input/text-input";
import { Typography } from "~/components/common/typography";
import { Stack } from "~/components/layout/stack/stack.component";

import { feedbackModalContainer } from "./feedback-modal.css";

type FeedbackModalProps = {
  bookId: string;
  onClose: () => void;
};

export const FeedbackModal = (props: FeedbackModalProps) => {
  const fetcher = useFetcher();

  const commentRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<number>(0);

  const handleScoreChanged = useCallback((value: number) => {
    scoreRef.current = value;
  }, []);

  const handleSendFeedback = useCallback(async () => {
    const commentInstance = commentRef.current;

    if (commentInstance === null) {
      return;
    }

    if (commentInstance.value.length < 1) {
      return;
    }

    if (scoreRef.current < 1) {
      return;
    }

    fetcher.submit(
      {
        bookId: props.bookId,
        comment: commentInstance.value,
        score: scoreRef.current,
      },
      {
        action: "/api/send-feedback",
        method: "POST",
        encType: "application/json",
      },
    );

    props.onClose();
  }, [props.bookId]);

  return (
    <Modal onClose={props.onClose}>
      <Stack
        direction="column"
        justify="start"
        align="center"
        className={clsx(feedbackModalContainer.style)}
        spacing={6}
      >
        <Typography textStyleVariant="size-32/bold" color="black/1">
          Оставьте свой отзыв
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
              Комментарий
            </Typography>

            <TextInput ref={commentRef} placeholder="умный текст" />
          </Stack>

          <Stack
            horizontalFluid={true}
            direction="column"
            justify="start"
            align="start"
            spacing={2}
          >
            <Typography textStyleVariant="size-16/semibold" color="black/1">
              Оценка
            </Typography>

            <ScoreInput onScoreChanged={handleScoreChanged} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justify="between"
          align="center"
          spacing={2}
          horizontalFluid={true}
        >
          <Button
            fluid={true}
            variant="primary"
            size="default"
            onClick={handleSendFeedback}
          >
            Отправить
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

type ScoreInputProps = {
  onScoreChanged: (value: number) => void;
};

const ScoreInput = (props: ScoreInputProps) => {
  const [mouseScore, setMouseScore] = useState(0);
  const [internalScore, setInternalScore] = useState(0);

  const actualScore = mouseScore === 0 ? internalScore : mouseScore;

  const setScore = useCallback(
    (value: number) => {
      setInternalScore(value);

      props.onScoreChanged(value);
    },
    [props.onScoreChanged],
  );

  return (
    <Stack
      horizontalFluid={true}
      direction="row"
      justify="start"
      align="center"
      spacing={2}
      onMouseLeave={() => setMouseScore(0)}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setMouseScore(1)}
        onClick={() => setScore(1)}
      >
        <path
          d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
          fill={actualScore > 0 ? "#FFB900" : "#919191"}
        />
      </svg>

      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setMouseScore(2)}
        onClick={() => setScore(2)}
      >
        <path
          d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
          fill={actualScore > 1 ? "#FFB900" : "#919191"}
        />
      </svg>

      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setMouseScore(3)}
        onClick={() => setScore(3)}
      >
        <path
          d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
          fill={actualScore > 2 ? "#FFB900" : "#919191"}
        />
      </svg>

      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setMouseScore(4)}
        onClick={() => setScore(4)}
      >
        <path
          d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
          fill={actualScore > 3 ? "#FFB900" : "#919191"}
        />
      </svg>

      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setMouseScore(5)}
        onClick={() => setScore(5)}
      >
        <path
          d="M5.0835 4.26667L6.95016 1.85C7.0835 1.67222 7.24183 1.54167 7.42516 1.45834C7.6085 1.375 7.80016 1.33334 8.00016 1.33334C8.20016 1.33334 8.39183 1.375 8.57516 1.45834C8.7585 1.54167 8.91683 1.67222 9.05016 1.85L10.9168 4.26667L13.7502 5.21667C14.0391 5.30556 14.2668 5.46945 14.4335 5.70834C14.6002 5.94723 14.6835 6.21111 14.6835 6.5C14.6835 6.63334 14.6641 6.76667 14.6252 6.9C14.5863 7.03334 14.5224 7.16111 14.4335 7.28334L12.6002 9.88334L12.6668 12.6167C12.6779 13.0056 12.5502 13.3333 12.2835 13.6C12.0168 13.8667 11.7057 14 11.3502 14C11.3279 14 11.2057 13.9833 10.9835 13.95L8.00016 13.1167L5.01683 13.95C4.96127 13.9722 4.90016 13.9861 4.8335 13.9917C4.76683 13.9972 4.70572 14 4.65016 14C4.29461 14 3.9835 13.8667 3.71683 13.6C3.45016 13.3333 3.32238 13.0056 3.3335 12.6167L3.40016 9.86667L1.5835 7.28334C1.49461 7.16111 1.43072 7.03334 1.39183 6.9C1.35294 6.76667 1.3335 6.63334 1.3335 6.5C1.3335 6.22223 1.41405 5.96389 1.57516 5.725C1.73627 5.48611 1.96127 5.31667 2.25016 5.21667L5.0835 4.26667Z"
          fill={actualScore > 4 ? "#FFB900" : "#919191"}
        />
      </svg>
    </Stack>
  );
};
