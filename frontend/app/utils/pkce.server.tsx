// import the crypto module
import crypto from "crypto";

// define a function to generate a random string of 43 characters
export function generateCodeVerifier(): string {
  // create a buffer of 32 bytes
  const buffer = crypto.randomBytes(32);

  // convert the buffer to a base64url-encoded string
  const verifier = buffer.toString("base64")
    .replace(/\+/g, "-") // replace + with -
    .replace(/\//g, "_") // replace / with _
    .replace(/=/g, ""); // remove =

  // return the verifier
  return verifier;
}

// define a function to generate a code challenge from a code verifier
export async function generateCodeChallenge(verifier: string): Promise<string> {
  // create a buffer from the verifier
  const buffer = Buffer.from(verifier);

  // hash the buffer using SHA-256
  const hash = await crypto.webcrypto.subtle.digest("SHA-256", buffer);

  // convert the hash to a base64url-encoded string
  const challenge = Buffer.from(hash).toString("base64")
    .replace(/\+/g, "-") // replace + with -
    .replace(/\//g, "_") // replace / with _
    .replace(/=/g, ""); // remove =

  // return the challenge
  return challenge;
}