import jwt from "jsonwebtoken";

export type VerifyTokenResult =
  | {
      ok: true;
      data: {
        userId: string;
      };
    }
  | {
      ok: false;
    };

export function verifyTokenCommandFactory(secret: string) {
  return async (token: string): Promise<VerifyTokenResult> => {
    try {
      const payload = jwt.verify(token, secret);

      if (typeof payload !== "object") {
        return {
          ok: false,
        };
      }

      if (!("userId" in payload)) {
        return {
          ok: false,
        };
      }

      return {
        ok: true,
        data: {
          userId: payload["userId"],
        },
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  };
}

export type VerifyTokenCommand = ReturnType<typeof verifyTokenCommandFactory>;
