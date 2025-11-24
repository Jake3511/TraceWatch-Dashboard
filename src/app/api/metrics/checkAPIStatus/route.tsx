import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const { metric_name, service, apiKey, data, timestamp } = body ?? {};

        // Make sure all fields are present before doing anything else.
        if (!metric_name || !service || !apiKey || !data || !timestamp) {
            throw new Error("Missing required fields. checkAPIStatus expects five arguments.");
        }

        // Basic insert for storing the incoming metric.
        const queryText = `
            INSERT INTO metrics (metric, service, apiKey, data, timestamp)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;

        const values = [metric_name, service, apiKey, data, timestamp];
        const result = await pool.query(queryText, values);

        console.log("Metric inserted:", result.rows[0]);
        return NextResponse.json({ id: result.rows[0].id }, { status: 201 });

    } catch (error: unknown) {

        // If we get a normal JS error, return the message for easier debugging.
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        // Fallback if the thrown value wasn't an Error object.
        return NextResponse.json(
            { message: "Data could not be sent for an unknown reason" },
            { status: 500 }
        );
    }
}
