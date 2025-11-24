interface auth0User {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export async function createAuth0User(params: auth0User) {

    // First grab a Management API token so we’re allowed to create users.
    const tokenRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLINET_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            grant_type: 'client_credentials',
        }),
    });

    // Pull the access token out of Auth0’s response.
    const { access_token } = await tokenRes.json();

    // Use that token to hit the Management API and create the actual user.
    const createRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.email,
            password: params.password,
            connection: "Username-Password-Authentication",
            user_metadata: {
                firstName: params.firstName,
                lastName: params.lastName,
            },
        }),
    });

    const userJson = await createRes.json();

    // If Auth0 throws back an error, surface it so the caller has context.
    if (!createRes.ok) {
        throw new Error(userJson?.message || "Failed to create Auth0 user");
    }

    // On success, return the newly created user object from Auth0.
    return userJson;
}
