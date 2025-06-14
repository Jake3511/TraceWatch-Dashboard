import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const loginRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, { // used to validate if application has valid permissions
        method:'POST', // defines the method being used
        headers: { // used to display the expected type back
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // defines our body in which we are sending to auth0
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

    const loginData = await loginRes.json(); // gets the login data and converts it into an object

    if (!loginRes.ok) {
        console.error("Auth0 login error:", loginData);
        return NextResponse.json(
          { error: loginData.error_description || loginData.error || 'Unknown Auth0 error' },
          { status: 400 }
        );
      }
      
    return NextResponse.json({ success: true, tokens: loginData});
}   