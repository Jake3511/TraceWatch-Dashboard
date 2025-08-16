import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const timestamp = new Date();
        const body = await req.json();
        const { metric, service, apiKey, data} = body;
        const userIdQuery = await pool.query('SELECT auth0id FROM users');

        let auth0_id = null;

        for (const row of userIdQuery.rows) {
            if(apiKey === row.api_key_hash) {
                auth0_id = row.auth0_id;
                break;
            }
        }
        
        if (!apiKey) {
            return NextResponse.json({ error: 'API key is required' }, { status: 401 });
        }

        console.log("Made it 1");
        const result = await pool.query('SELECT api_key_hash FROM users');

        const valid = result.rows.some(row => {
            console.log(row.api_key_hash);
            return apiKey === row.api_key_hash;
        });

        if (!valid) {
            return NextResponse.json({ error: 'No valid API key was entered' }, { status: 401 });
        }

        console.log("Made it 2");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/metrics/${metric}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ metric, service, auth0_id, data, timestamp })
        });

        const responseData = await res.json();

        return NextResponse.json({
            message: `Forwarded data to /api/${metric}`,
            status: res.status,
            response: responseData,
        }, { status: res.status});

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Caught error:", error.message);
            console.error("Stack:", error.stack);
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 400 });
        }
    }
}