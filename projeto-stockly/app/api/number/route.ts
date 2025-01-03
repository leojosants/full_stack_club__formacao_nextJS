interface HttpStatusCodeInterface {
    ok: number;
};

const httpStatusCode: HttpStatusCodeInterface = {
    ok: 200,
};

export async function GET() {
    return Response.json(
        Math.random(), { status: httpStatusCode.ok }
    );
};