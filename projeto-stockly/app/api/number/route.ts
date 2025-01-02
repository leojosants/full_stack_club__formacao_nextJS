interface HttpStatusCodeInterface {
    created: number;
    ok: number;
};

const httpStatusCode: HttpStatusCodeInterface = {
    created: 201,
    ok: 200,
};

export async function GET() {
    const randomNumber = Math.random();

    return Response.json(
        { randomNumber }, { status: httpStatusCode.ok }
    );
};