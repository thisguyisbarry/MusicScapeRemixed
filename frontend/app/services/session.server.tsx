import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '_session', 
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: process.env.COOKIE_SECRETS, 
        secure: process.env.NODE_ENV === 'production', // enable this in prod only
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;