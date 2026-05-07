import jwt from "jsonwebtoken";

export type GenerateTokenResult =
  | {
      ok: true;
      data: {
        token: string;
      };
    }
  | {
      ok: false;
    };

export function generateTokenCommandFactory(
  secret: string,
  expirationMs: number,
) {
  return async (userId: string): Promise<GenerateTokenResult> => {
    const token = jwt.sign({ userId: userId }, secret, {
      expiresIn: expirationMs / 60_000,
    });

    return {
      ok: true,
      data: {
        token: token,
      },
    };
  };
}

export type GenerateTokenCommand = ReturnType<
  typeof generateTokenCommandFactory
>;
