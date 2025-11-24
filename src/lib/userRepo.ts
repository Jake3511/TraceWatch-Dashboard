import { pool } from "@/lib/db"

interface dbUser {
    auth0Id: string,
    hashedApiKey: string,
    email: string,
    firstName: string,
    lastName: string,
};

export async function saveUserToDb(params: dbUser) {
    const { auth0Id, hashedApiKey, email, firstName, lastName } = params;

    // Insert the new user into the users table.
    // Note: api_key_hash stores the hashed version of the user's API key.
    const query = `
        INSERT INTO users (auth0_id, email, first_name, last_name, api_key_hash)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;
    
    const values = [auth0Id, email, firstName, lastName, hashedApiKey];
    const result = await pool.query(query, values);

    // Return the generated row (usually just the id).
    return result.rows[0];
}
