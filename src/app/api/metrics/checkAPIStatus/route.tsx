import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const {metric_name, service, apiKey, data, timestamp} = body ?? {};

        if(!metric_name || !service || !apiKey || !data || !timestamp)
            throw new Error("Missing one of the fields, checkAPIStatus takes five arguments")

        const queryText = 
        `INSERT INTO metrics (metric, service, apiKey, data, timestamp)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;
        const values = [metric_name, service, apiKey, data, timestamp];
        const result = await pool.query(queryText, values);
        console.log(result)

    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        } 
        else {
            return NextResponse.json({message: "Data could not be sent for unknown reason"});
        }
    }
}