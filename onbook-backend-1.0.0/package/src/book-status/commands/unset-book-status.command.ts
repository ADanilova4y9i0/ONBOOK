import { type DatabaseConnection } from "../../database/connection";

export type UnsetBookStatusResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function unsetBookStatusCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    userId: string,
    bookId: string,
  ): Promise<UnsetBookStatusResult> => {
    const relation = await databaseConnection
      .deleteFrom("userBookStatus")
      .where("userBookStatus.userId", "=", userId)
      .where("userBookStatus.bookId", "=", bookId)
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

export type UnsetBookStatusCommand = ReturnType<
  typeof unsetBookStatusCommandFactory
>;
