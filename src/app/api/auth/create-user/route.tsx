import { NextResponse } from "next/server";
import { createUserService } from "@/lib/userService"
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export async function POST(req: Request): Promise<NextResponse> {
    const body = await req.json();

    // Generate a fresh API key for the user. This is the only time the plain value is ever exposed.
    const apiKey = randomBytes(32).toString("hex");

    // Hash the API key before storing it so we never keep the raw value in the DB.
    const saltRounds = 10;
    const hashedApiKey = await bcrypt.hash(apiKey, saltRounds);

    try {
        // Create the user record and save the hashed API key along with their other info.
        const user = await createUserService({
            email: body.email,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName,
            hashedApiKey: hashedApiKey,
        });

        // Send the plain API key back to the client once so they can copy/store it.
        return NextResponse.json(
            { apiKey },
            { status: 201 }
        );

    } catch (err) {
        // Helpful for debugging—logs the actual error to the server console.
        console.error("createUserService error:", err);

        // Client gets a cleaner error message.
        return NextResponse.json(
          { error: err instanceof Error ? err.message : "Unknown error" },
          { status: 400 }
        );
    }
}
