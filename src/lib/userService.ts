import { abstractEmailCheck } from "@/lib/emailValidation"
import { createAuth0User } from "@/lib/auth0"
import { saveUserToDb } from "@/lib/userRepo"

interface createUserResult {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    hashedApiKey: string,
};

export async function createUserService(params: createUserResult) {
    const { email, password, firstName, lastName, hashedApiKey } = params;

    // Quick sanity check before talking to Auth0 or the DB.
    const isValid = await abstractEmailCheck(email);
    if (!isValid) {
        throw new Error("Invalid Email detected");
    }

    // Create the user in Auth0 first. If this fails, we don't touch our DB.
    const auth0User = await createAuth0User({
        email,
        password,
        firstName,
        lastName
    });

    const auth0ID = auth0User.user_id;

    // Store the user record in our own DB with the hashed API key.
    await saveUserToDb({
        auth0Id: auth0ID,
        hashedApiKey,
        email,
        firstName,
        lastName,
    });

    // Return a small object with the important pieces.
    return {
        auth0Id: auth0ID,
        hashedApiKey,
        email,
        firstName,
        lastName
    };
}
