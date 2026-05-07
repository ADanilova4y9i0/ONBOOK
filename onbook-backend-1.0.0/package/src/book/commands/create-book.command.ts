import { type DatabaseConnection } from "../../database/connection";

export type CreateBookResult =
  | {
      ok: true;
      data: {
        bookId: string;
      };
    }
  | {
      ok: false;
      error: "unknown";
    };

export function createBookCommandFactory(
  databaseConnection: DatabaseConnection,
) {
  return async (
    title: string,
    description: string,
    attrs: Record<string, string>,
    preview?: string,
  ): Promise<CreateBookResult> => {


    
    const book = await databaseConnection
      .insertInto("book")
      .values({
        title: title,
        preview: preview,
        description: description,
        attrs: attrs,
      })
      .returning(["book.id"])
      .executeTakeFirst();

    if (book === undefined) {
      return {
        ok: false,
        error: "unknown",
      };
    }

    return {
      ok: true,
      data: {
        bookId: book.id,
      },
    };
  };
}

export type CreateBookCommand = ReturnType<typeof createBookCommandFactory>;
