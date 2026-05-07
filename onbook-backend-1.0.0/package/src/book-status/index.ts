import { type DatabaseConnection } from "../database/connection";
import { setBookStatusCommandFactory } from "./commands/set-book-status.command";
import { unsetBookStatusCommandFactory } from "./commands/unset-book-status.command";
import { getBookStatusQueryFactory } from "./query/get-book-status.query";

export async function bootstrapBookStatusService(
  databaseConnection: DatabaseConnection,
) {
  const setBookStatusCommand = setBookStatusCommandFactory(databaseConnection);

  const unsetBookStatusCommand =
    unsetBookStatusCommandFactory(databaseConnection);

  const getBookStatusQuery = getBookStatusQueryFactory(databaseConnection);

  return {
    setBookStatusCommand: setBookStatusCommand,
    unsetBookStatusCommand: unsetBookStatusCommand,
    getBookStatusQuery: getBookStatusQuery,
  };
}
export type BookStatusService = Awaited<
  ReturnType<typeof bootstrapBookStatusService>
>;
