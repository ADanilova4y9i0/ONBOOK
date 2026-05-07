export function parseCookie(cookieString: string | null) {
  if (!cookieString) return {};

  return Object.fromEntries(
    cookieString.split(";").map((cookie) => cookie.trim().split("=")),
  );
}
