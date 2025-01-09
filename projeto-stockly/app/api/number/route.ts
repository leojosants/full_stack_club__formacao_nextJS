import { httpStatusCode } from "@/app/_helpers/http-status-code";


export async function GET() {
    return Response.json(
        Math.random(), { status: httpStatusCode.ok }
    );
};