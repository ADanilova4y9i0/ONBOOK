import z from "zod";

import { fetchServer } from "./constants";

const SignInResultSchema = z.object({
  token: z.string(),
});

type SignInResultSchema = z.infer<typeof SignInResultSchema>;

type SignInResult =
  | {
      ok: true;
      data: SignInResultSchema;
    }
  | {
      ok: false;
    };

export async function signIn(
  login: string,
  password: string,
): Promise<SignInResult> {
  const response = await fetchServer("auth/sign-in", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `signIn response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = SignInResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signIn parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  console.info("signIn success");

  return {
    ok: true,
    data: parsedResult.data,
  };
}

const SignUpResultSchema = z.object({
  token: z.string(),
});

type SignUpResultSchema = z.infer<typeof SignUpResultSchema>;

type SignUpResult =
  | {
      ok: true;
      data: SignUpResultSchema;
    }
  | {
      ok: false;
    };

export async function signUp(
  login: string,
  password: string,
): Promise<SignUpResult> {
  const response = await fetchServer("auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `signUp response not ok: ${response.status} - ${response.statusText}`,
    );

    return { ok: false };
  }

  const data = await response.json();

  const parsedResult = SignUpResultSchema.safeParse(data);

  if (!parsedResult.success) {
    console.error(`signUp parse error: ${z.prettifyError(parsedResult.error)}`);

    return { ok: false };
  }

  console.info("signUp success");

  return {
    ok: true,
    data: parsedResult.data,
  };
}
