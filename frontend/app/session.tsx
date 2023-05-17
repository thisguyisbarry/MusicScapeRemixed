import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  code_verifier: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",

        httpOnly: true,
        maxAge: 604_800,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
      },
    }
  );

export { getSession, commitSession, destroySession };
