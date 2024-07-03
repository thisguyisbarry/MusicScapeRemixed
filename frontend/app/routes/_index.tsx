import type { MetaFunction } from "@remix-run/node";

import type { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { spotifyStrategy } from '~/services/auth.server';
import RecentlyPlayedSongs from "~/components/RecentlyPlayedSongs";


export const meta: MetaFunction = () => {
  return [{ title: "MusicScapeRemix" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return spotifyStrategy.getSession(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  const accessToken = data?.accessToken;

  return (
      <div style={{ textAlign: 'center', padding: 20 }}>
          <h2>Welcome to MusicScapeRemix!</h2>
          <p>
              This is a work in progress
          </p>
          {user ? (
            <div>
              <p>You are logged in as: {user?.name}</p>
              <RecentlyPlayedSongs token={accessToken!}/>
            </div>
          ) : (
              <p>You are not logged in yet!</p>
          )}
          <Form action={user ? '/logout' : '/auth/spotify'} method="post">
              <button>{user ? 'Logout' : 'Log in with Spotify'}</button>
          </Form>
      </div>
  );
}
