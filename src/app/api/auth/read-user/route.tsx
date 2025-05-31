import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const loginRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
            username: body.email,
            password: body.password,
            client_id: process.env.AUTH0_CLINET_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email',
            realm: 'Username-Password-Authentication',
        }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
        console.error("Auth0 login error:", loginData);
        return NextResponse.json(
          { error: loginData.error_description || loginData.error || 'Unknown Auth0 error' },
          { status: 400 }
        );
      }
      
    return NextResponse.json({ success: true, tokens: loginData});
}   