import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const {metric_name, service, auth0_id, data, timestamp} = body;
        const queryText = 
        `INSERT INTO metrics (metric, service, apiKey, data, timestamp)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;
        const values = [metric_name, service, auth0_id, data, timestamp];
        const result = await pool.query(queryText, values);


    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        } 
        else {
            return NextResponse.json({message: "Data could not be sent for unknown reason"});
        }
    }
    return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });
}

// export async function GET(req: NextResponse) {
//     try {

//     }

//     catch (error: unknown) {

//     }
// }