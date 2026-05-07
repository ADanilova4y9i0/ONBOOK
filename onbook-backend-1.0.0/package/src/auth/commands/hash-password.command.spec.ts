import bcrypt from "bcrypt";
import { expect, test, describe } from "bun:test";

import { hashPasswordCommandFactory } from "./hash-password.command";

describe("hashPasswordCommandFactory", () => {
  const saltRounds = 10;
  const hashPassword = hashPasswordCommandFactory(saltRounds);
  const password = "my-secret-password";

  test("should successfully hash a password", async () => {
    const result = await hashPassword(password);

    expect(result.ok).toBe(true);

    if (result.ok) {
      const { hash } = result.data;

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);

      const isMatch = await bcrypt.compare(password, hash);
      expect(isMatch).toBe(true);
    }
  });
});
