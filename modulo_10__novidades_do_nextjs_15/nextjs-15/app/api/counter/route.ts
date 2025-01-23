import { NextResponse } from "next/server";

// cache explícito
export const dynamic = "force-static";

export const GET = async (): Promise<NextResponse<{ count: number }>> => {
    return NextResponse.json(
        { count: Math.random() }
    );
};