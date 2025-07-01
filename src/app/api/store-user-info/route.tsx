import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {auth0id, email, firstName, lastName} = body;

        if (!auth0id || !email || !firstName || !lastName) {
            return NextResponse.json({ error: 'Email and API key are required' }, { status: 400 });
        }

        const apiKey = randomBytes(32).toString("hex");
        const saltRounds = 10;
        const apiKeyHash = await bcrypt.hash(apiKey, saltRounds);

        const query = `
            INSERT INTO users (auth0_id, email, first_name, last_name, api_key_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;
        
        const values = [auth0id, email, firstName, lastName, apiKeyHash];
        const result = await pool.query(query, values);

        return NextResponse.json({ success: true, userId: result.rows[0].id, apiKey });
    } 
    catch (err: unknown) {
        console.log("Error storing API keys or saving user info", err);
    
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}