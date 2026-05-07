import { type DatabaseConnection } from "../../database/connection";
import { type UserBookStatus } from "../../database/enums/user-book-status";

export type GetBookStatusResult =
  | {
      ok: true;
      data: {
        status: UserBookStatus;
      };
    }
  | {
      ok: false;
      error: "unknown" | "user_book_status.not_found";
    };

export function getBookStatusQueryFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    userId: string,
    bookId: string,
  ): Promise<GetBookStatusResult> => {
    const userBookStatus = await databaseConnection
      .selectFrom("userBookStatus")
      .select(["userBookStatus.status"])
      .where("userBookStatus.userId", "=", userId)
      .where("userBookStatus.bookId", "=", bookId)
      .executeTakeFirst();

    if (userBookStatus === undefined) {
      return {
        ok: false,
        error: "user_book_status.not_found",
      };
    }

    return {
      ok: true,
      data: {
        status: userBookStatus.status,
      },
    };
  };
}

export type GetBookStatusQuery = ReturnType<typeof getBookStatusQueryFactory>;
