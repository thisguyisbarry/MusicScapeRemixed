import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { destroySession, getSession } from '~/services/session.server';

export async function action({ request }: ActionFunctionArgs) {
    return redirect('/', {
        headers: {
            'Set-Cookie': await destroySession(
                await getSession(request.headers.get('cookie')),
            ),
        },
    });
}

export function loader() {
    throw json({}, { status: 404 });
}