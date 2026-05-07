import bcrypt from "bcrypt";

export type ComparePasswordResult =
  | {
      ok: true;
    }
  | {
      ok: false;
    };

export function comparePasswordCommandFactory() {
  return async (
    hashedPassword: string,
    password: string,
  ): Promise<ComparePasswordResult> => {
    const result = await bcrypt.compare(password, hashedPassword);

    return {
      ok: result,
    };
  };
}
export type ComparePasswordCommand = ReturnType<
  typeof comparePasswordCommandFactory
>;
