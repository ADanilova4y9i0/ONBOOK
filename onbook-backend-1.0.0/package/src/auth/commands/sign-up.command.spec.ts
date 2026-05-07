import { expect, test, describe } from "bun:test";

import { signUpCommandFactory } from "./sign-up.command";

describe("signInCommandFactory", () => {
  const users = new Map<
    string,
    {
      id: string;
      login: string;
      password: string;
      isAdmin: boolean;
    }
  >();

  const signUpCommand = signUpCommandFactory(
    async (login) => {
      const user = users.get(login);

      if (user === undefined) {
        return {
          ok: false,
          error: "user.not-found",
        };
      }

      return {
        ok: true,
        data: {
          id: user.id,
          login: user.login,
          password: user.password,
        },
      };
    },
    async (login, password, isAdmin) => {
      if (users.has(login)) {
        return {
          ok: false,
          error: "unknown",
        };
      }

      const user = {
        id: Date.now().toString(),
        login: login,
        password: password,
        isAdmin: isAdmin,
      };

      users.set(login, user);

      return {
        ok: true,
        data: {
          id: user.id,
          login: user.login,
          password: user.password,
        },
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

  test("should successfully sign up flow", async () => {
    const signUpResult1 = await signUpCommand("root", "root");

    expect(signUpResult1.ok).toBe(true);

    if (signUpResult1.ok) {
      const { token } = signUpResult1.data;

      expect(token).toBeDefined();
    }

    const signUpResult2 = await signUpCommand("root", "root");

    expect(signUpResult2.ok).toBe(false);

    const signUpResult3 = await signUpCommand("root", "other");

    expect(signUpResult3.ok).toBe(false);

    const signUpResult4 = await signUpCommand("user1", "1");

    expect(signUpResult4.ok).toBe(true);

    if (signUpResult4.ok) {
      const { token } = signUpResult4.data;

      expect(token).toBeDefined();
    }
  });
});
