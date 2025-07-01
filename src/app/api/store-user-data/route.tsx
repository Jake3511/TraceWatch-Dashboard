import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto"; 

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { metric, apiKey, data } = body;
        
        const result = pool.query('SELECT api_key_hash FROM users');
        

        return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error parsing JSON body:", error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}