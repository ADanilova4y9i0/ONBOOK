import { expect, test, describe } from "bun:test";

import { comparePasswordCommandFactory } from "./compare-password.command";
import { hashPasswordCommandFactory } from "./hash-password.command";

describe("hashPasswordCommandFactory", () => {
  const saltRounds = 10;

  const hashPasswordCommand = hashPasswordCommandFactory(saltRounds);
  const comparePasswordCommand = comparePasswordCommandFactory();

  const password = "my-secret-password";

  test("should successfully hash a password", async () => {
    const result = await hashPasswordCommand(password);

    expect(result.ok).toBe(true);

    if (result.ok) {
      const { hash } = result.data;

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);

      const isMatch = await comparePasswordCommand(hash, password);
      expect(isMatch.ok).toBe(true);
    }
  });
});
