import bcrypt from "bcrypt";

type HashPasswordResult =
  | {
      ok: true;
      data: {
        hash: string;
      };
    }
  | {
      ok: false;
    };

export function hashPasswordCommandFactory(rounds: number) {
  return async (password: string): Promise<HashPasswordResult> => {
    const hash = await bcrypt.hash(password, rounds);

    return {
      ok: true,
      data: {
        hash: hash,
      },
    };
  };
}

export type HashPasswordCommand = ReturnType<typeof hashPasswordCommandFactory>;
