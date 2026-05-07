import { type DatabaseConnection } from "../database/connection";
import { getUserQueryFactory } from "./query/get-user.query";

export async function bootstrapUserService(
  databaseConnection: DatabaseConnection,
) {
  const getUserQuery = getUserQueryFactory(databaseConnection);

  return {
    getUserQuery: getUserQuery,
  };
}

export type UserService = Awaited<ReturnType<typeof bootstrapUserService>>;
