import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const tokenRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, { // creates token to confirm application/server has correct permissions
        method: 'POST', // defines http method as type POST
        headers: { 'Content-Type': 'application/json' }, // defines the type of response we will send to AUTH0
        body: JSON.stringify({ // turn content into json object
            client_id: process.env.AUTH0_CLINET_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            grant_type: 'client_credentials',
        }),
    })

    const { access_token } = await tokenRes.json(); // used to confirm that user has now obtained correct permissions

    const createRes = await fetch (`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, { // gets the users api so that we can create a new user
        method: 'POST', // defines http method
        headers: {
            Authorization: `Bearer ${access_token}`, // confirms user has correct auth0 credentials
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ // will post the email, password, connection, and metadata to auth0 database.
            email: body.email,
            password: body.password,
            connection: "Username-Password-Authentication",
            user_metadata: {
                firstName: body.firstName,
                lastName: body.lastName,
            },
        }),
    })
    if (!createRes.ok) {
        const error = await createRes.json();
        return NextResponse.json({ error }, { status: 400 });
    }

    const user = await createRes.json();
    return NextResponse.json(user);
}