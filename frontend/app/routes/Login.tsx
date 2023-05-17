// app/routes/login.tsx
import { useLoaderData, useNavigate } from "@remix-run/react";
import { generateCodeVerifier, generateCodeChallenge } from "~/utils/pkce.server"; 
import { json } from "@remix-run/node";
import type { LoaderArgs  } from "@remix-run/node";

import { getSession, commitSession } from "~/session";


// define the loader function to generate the code verifier and challenge
export let loader = async ({ request } : LoaderArgs) => {
    // get the session from the request
    const session = await getSession(request.headers.get("cookie"));
    console.log("Session ");

    // generate a random code verifier
    let codeVerifier : string = generateCodeVerifier();

    // store the code verifier in the session
    session.set("code_verifier", codeVerifier);

    // generate a code challenge from the code verifier
    let codeChallenge : string = await generateCodeChallenge(codeVerifier);

    // return the code challenge as data1
    return json({ "codeChallenge" : codeChallenge }, {
    headers: {
        "Set-Cookie": await commitSession(session)
    }
    });
};

// define the component to render a button that redirects to Spotify login page
export default function Login() {
  // get the code challenge from the loader data
    let data = useLoaderData();
    let navigate = useNavigate();
    console.log("Data " + data);
    let codeChallenge = data.codeChallenge;

  // define the Spotify authorization parameters
    let clientId :    string = process.env.SPOTIFY_CLIENT_ID!;
    let redirectUri : string = process.env.SPOTIFY_REDIRECT_URI!;
    let scope : string = "user-read-private user-read-email"; // or any other scopes you need

  // construct the Spotify authorization URL with PKCE
    let authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("code_challenge", codeChallenge);
    authUrl.searchParams.append("scope", scope);
    console.log(authUrl);
  // return a button that redirects to the authUrl when clicked
  return (
    <div>
      <button onClick={() => navigate(authUrl)}>
        Log in by Spotify
      </button>
    </div>
  );
}
