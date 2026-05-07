import { type DatabaseConnection } from "../../database/connection";

export type UpdateBookResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: "unknown" | "book.not_found";
    };

export function updateBookCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    id: string,
    title?: string,
    description?: string,
    preview?: string,
    attrs?: Record<string, string>,
  ): Promise<UpdateBookResult> => {
    try {
      await databaseConnection.transaction().execute(async (trx) => {
        const book = await databaseConnection
          .selectFrom("book")
          .select("book.attrs")
          .where("book.id", "=", id)
          .executeTakeFirstOrThrow();

        await databaseConnection
          .updateTable("book")
          .where("book.id", "=", id)
          .set({
            updatedAt: new Date(),
            title: title,
            description: description,
            preview: preview,
            attrs: {
              ...book.attrs,
              ...attrs,
            },
          })
          .execute();
      });
    } catch (error) {
      return {
        ok: false,
        error: "book.not_found",
      };
    }

    return {
      ok: true,
    };
  };
}

export type UpdateBookGenreCommand = ReturnType<
  typeof updateBookCommandFactory
>;
