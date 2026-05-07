import { expect, test, describe } from "bun:test";

import { signInCommandFactory } from "./sign-in.command";

describe("signInCommandFactory", () => {
  const signInCommand = signInCommandFactory(
    async (login) => {
      if (login === "root") {
        return {
          ok: true,
          data: {
            id: "1",
            login: "root",
            password: "root",
          },
        };
      }

      return {
        ok: false,
        error: "user.not-found",
      };
    },
    async (hashedPassword, password) => {
      if (hashedPassword === password) {
        return {
          ok: true,
        };
      }

      return {
        ok: false,
      };
    },
    async (userId) => {
      return {
        ok: true,
        data: {
          token: `auth_token_${userId}`,
        },
      };
    },
  );

  test("should successfully sign in", async () => {
    const result = await signInCommand("root", "root");

    expect(result.ok).toBe(true);

    if (result.ok) {
      const { token } = result.data;

      expect(token).toBeDefined();
    }
  });

  test("should unsuccessfully sign in with incorrect password", async () => {
    const result = await signInCommand("root", "hacker");

    expect(result.ok).toBe(false);
  });

  test("should unsuccessfully sign in for unknown user", async () => {
    const result = await signInCommand("test", "test");

    expect(result.ok).toBe(false);
  });
});
