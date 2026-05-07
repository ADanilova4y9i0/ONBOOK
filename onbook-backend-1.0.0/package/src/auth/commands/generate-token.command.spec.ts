import { expect, test, describe } from "bun:test";
import jwt from "jsonwebtoken";

import { generateTokenCommandFactory } from "./generate-token.command";

describe("generateTokenCommandFactory", () => {
  const secret = "secret";
  const expirationMs = 60_000;
  const generateToken = generateTokenCommandFactory(secret, expirationMs);
  const userId = "123";

  test("should successfully generate a valid JWT token", async () => {
    const result = await generateToken(userId);

    expect(result.ok).toBe(true);

    if (result.ok) {
      const token = result.data.token;

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");

      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      expect(decoded["userId"]).toBe(userId);
    }
  });
});
