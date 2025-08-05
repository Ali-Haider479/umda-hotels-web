import { connectToDB } from "@/utils/database";
import Hotel from "@/models/hotel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const hotels = await Hotel.find().populate('rooms');

        return NextResponse.json(
            hotels,
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error getting hotel:", error);
        return NextResponse.json(
            { error: "Failed to get hotel", details: error.message },
            { status: 500 }
        );
    }
}