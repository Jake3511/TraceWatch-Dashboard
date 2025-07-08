import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { metric, apiKey, data } = body;
        
        if (apiKey != "") {
            return NextResponse.json({ error: 'API key is required' }, { status: 401 });
        }

        const result = await pool.query('SELECT api_key_hash FROM users');

        const valid = result.rows.some(row => 
            bcrypt.compareSync(apiKey, row.api_key_hash)
        );

        if (!valid) {
            return NextResponse.json({ error: 'No valid API key was entered' }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/metrics/${metric}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });

        const responseData = await res.json();

        return NextResponse.json({
            message: `Forwarded data to /api/${metric}`,
            status: res.status,
            response: responseData,
        }, { status: res.status});

    } catch (error) {
        console.error("Error parsing JSON body:", error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}