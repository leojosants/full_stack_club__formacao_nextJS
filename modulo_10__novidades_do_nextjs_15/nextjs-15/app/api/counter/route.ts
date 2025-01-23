import { NextResponse } from "next/server";


export const GET = async (): Promise<NextResponse<{ count: number }>> => {
    return NextResponse.json(
        { count: Math.random() }
    );
};