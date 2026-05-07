import { type DatabaseConnection } from "../../database/connection";

export type CreateBookAuthorResult =
  | {
      ok: true;
      data: {
        bookAuthorId: string;
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function createBookAuthorCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    firstname: string,
    lastname: string,
    middlename: string | undefined | null,
    biography: string,
    dateOfBirth: Date,
    avatar?: string | null,
  ): Promise<CreateBookAuthorResult> => {
    const bookAuthor = await databaseConnection
      .insertInto("bookAuthor")
      .values({
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        biography: biography,
        dateOfBirth: dateOfBirth,
        avatar: avatar,
      })
      .returning(["bookAuthor.id"])
      .executeTakeFirst();

    if (bookAuthor === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
      data: {
        bookAuthorId: bookAuthor.id,
      },
    };
  };
}

export type CreateBookAuthorCommand = ReturnType<
  typeof createBookAuthorCommandFactory
>;
