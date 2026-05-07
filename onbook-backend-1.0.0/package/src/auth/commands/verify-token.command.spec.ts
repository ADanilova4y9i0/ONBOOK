import { expect, test, describe } from "bun:test";

import { generateTokenCommandFactory } from "./generate-token.command";
import { verifyTokenCommandFactory } from "./verify-token.command";

describe("verifyTokenCommandFactory", () => {
  const userId = "123";

  const secret = "secret";
  const expirationMs = 60_000;

  const generateToken = generateTokenCommandFactory(secret, expirationMs);

  const verifyToken = verifyTokenCommandFactory(secret);

  test("should successfully verify token", async () => {
    const generateTokenResult = await generateToken(userId);

    expect(generateTokenResult.ok).toBe(true);

    if (generateTokenResult.ok) {
      const { token } = generateTokenResult.data;

      expect(token).toBeDefined();

      const verifyTokenResult = await verifyToken(token);
      expect(verifyTokenResult.ok).toBe(true);

      if (verifyTokenResult.ok) {
        expect(verifyTokenResult.data.userId).toBe(userId);
      }
    }
  });
});
