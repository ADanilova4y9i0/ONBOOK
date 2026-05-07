import { type DatabaseConnection } from "../../database/connection";

export type CreateFeedbackResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function createFeedbackCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    bookId: string,
    userId: string,
    comment: string,
    score: number,
  ): Promise<CreateFeedbackResult> => {
    const bookFeedback = await databaseConnection
      .insertInto("bookFeedback")
      .values({
        bookId: bookId,
        userId: userId,
        comment: comment,
        score: score,
      })
      .returning(["bookFeedback.createdAt"])
      .executeTakeFirst();

    if (bookFeedback === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
    };
  };
}

export type CreateFeedbackCommand = ReturnType<
  typeof createFeedbackCommandFactory
>;
