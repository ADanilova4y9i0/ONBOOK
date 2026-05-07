import { type DatabaseConnection } from "../../database/connection";

export type UpdateBookAuthorResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown";
    };

export function updateBookAuthorCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    id: string,
    firstname?: string,
    lastname?: string,
    middlename?: string | null,
    dateOfBirth?: number,
    biography?: string,
    avatar?: string | null,
  ): Promise<UpdateBookAuthorResult> => {
    const bookAuthor = await databaseConnection
      .updateTable("bookAuthor")
      .where("bookAuthor.id", "=", id)
      .set({
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        dateOfBirth:
          dateOfBirth === undefined ? undefined : new Date(dateOfBirth),
        biography: biography,
        avatar: avatar,
      })
      .executeTakeFirst();

    if (bookAuthor === undefined) {
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

export type UpdateBookAuthorCommand = ReturnType<
  typeof updateBookAuthorCommandFactory
>;
