import { type DatabaseConnection } from "../../database/connection";
import { type UserBookStatus } from "../../database/enums/user-book-status";

export type SetBookStatusResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function setBookStatusCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    userId: string,
    bookId: string,
    status: UserBookStatus,
  ): Promise<SetBookStatusResult> => {
    const relation = await databaseConnection
      .insertInto("userBookStatus")
      .values({
        userId: userId,
        bookId: bookId,
        status: status,
      })
      .onConflict((oc) =>
        oc.columns(["userId", "bookId"]).doUpdateSet({
          status: status,
          updatedAt: new Date(),
        }),
      )
      .executeTakeFirst();

    if (relation === undefined) {
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

export type SetBookStatusCommand = ReturnType<
  typeof setBookStatusCommandFactory
>;
