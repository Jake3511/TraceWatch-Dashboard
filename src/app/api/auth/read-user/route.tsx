import { NextResponse } from "next/server";

interface Auth0LoginResponse {
  access_token: string;
  id_token?: string;
  expires_in: number;
  token_type: string;
}

interface Auth0ErrorResponse {
  error: string;
  error_description?: string;
}

// Simple check so we can tell when Auth0 sends back an error payload.
function isAuth0Error(data: any): data is Auth0ErrorResponse {
  return typeof data.error === "string";
}

export async function POST(req: Request) {
  const body = await req.json();

  // Call Auth0's token endpoint with the user's credentials.
  const loginRes = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "http://auth0.com/oauth/grant-type/password-realm",
        username: body.email,
        password: body.password,
        client_id: process.env.AUTH0_CLINET_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid profile email",
        realm: "Username-Password-Authentication",
      }),
    }
  );

  // Auth0 sends JSON whether it's a success or an error, so decode it either way.
  const data = await loginRes.json();

  if (!loginRes.ok) {
    // Auth0 returned a recognizable error format.
    if (isAuth0Error(data)) {
      return NextResponse.json(
        { error: data.error_description ?? data.error },
        { status: 400 }
      );
    }

    // Fallback if the error shape isn't what we expected.
    return NextResponse.json(
      { error: "Unknown Auth0 error" },
      { status: 400 }
    );
  }

  // At this point Auth0 confirmed the login and gave us a token.
  const typed = data as Auth0LoginResponse;
  const token = typed.access_token;

  // Set the user's session cookie.
  const res = NextResponse.json({ success: true });

  res.cookies.set("tw-token", token, {
    httpOnly: true,               // keep it out of client-side JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,         // valid for 24 hours
  });

  return res;
}
