import { type DatabaseConnection } from "../../database/connection";

export type GetBookFeedbacksResult =
  | {
      ok: true;
      data: {
        feedbacks: {
          user: { login: string; avatar: string | null };
          comment: string;
          score: number;
          createdAt: number;
        }[];
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function getBookFeedbacksQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (bookId: string): Promise<GetBookFeedbacksResult> => {
    const feedbacks = await databaseConnection
      .selectFrom("bookFeedback")
      .innerJoin("user", "bookFeedback.userId", "user.id")
      .select([
        "user.login",
        "user.avatar",
        "bookFeedback.comment",
        "bookFeedback.score",
        "bookFeedback.createdAt",
      ])
      .where("bookFeedback.bookId", "=", bookId)
      .execute();

    return {
      ok: true,
      data: {
        feedbacks: feedbacks.map((item) => ({
          user: {
            login: item.login,
            avatar: item.avatar,
          },
          comment: item.comment,
          score: item.score,
          createdAt: item.createdAt.getTime(),
        })),
      },
    };
  };
}

export type GetBookFeedbacksQuery = ReturnType<
  typeof getBookFeedbacksQueryFactory
>;
