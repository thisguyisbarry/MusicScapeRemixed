import type { V2_MetaFunction } from "@remix-run/node";

import type { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { spotifyStrategy } from '~/services/auth.server';


export const meta: V2_MetaFunction = () => {
  return [{ title: "MusicScapeRemix" }];
};

export async function loader({ request }: LoaderArgs) {
  return spotifyStrategy.getSession(request);
}


export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  return (
      <div style={{ textAlign: 'center', padding: 20 }}>
          <h2>Welcome to MusicScapeRemix!</h2>
          <p>
              This is a work in progress
          </p>
          {user ? (
              <p>You are logged in as: {user?.name}</p>
          ) : (
              <p>You are not logged in yet!</p>
          )}
          <Form action={user ? '/logout' : '/auth/spotify'} method="post">
              <button>{user ? 'Logout' : 'Log in with Spotify'}</button>
          </Form>
      </div>
  );
}
