export const SERVER_URI = `http://localhost:5000/`;

export async function fetchServer(
  input: string | URL | Request,
  init?: RequestInit,
): ReturnType<typeof fetch> {
  if (typeof input === "string") {
    input = `${SERVER_URI}${input}`;
  }

  return fetch(input, init);
}
