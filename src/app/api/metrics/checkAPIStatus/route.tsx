import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });
}