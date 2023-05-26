import type { LoaderArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export function loader({ request }: LoaderArgs) {
    return authenticator.authenticate('spotify', request, {
        successRedirect: '/',
        failureRedirect: '/login',
    });
}