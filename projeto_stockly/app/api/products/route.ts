import { db } from "@/app/_lib/prisma";


interface HttpStatusInterface {
    created: number,
    ok: number,
};

const httpStatus: HttpStatusInterface = {
    created: 201,
    ok: 200,
};

export async function GET() {
    const products = await db.product.findMany({});
    
    return Response.json(
        products, { status: httpStatus.ok }
    );
};

export async function POST(request: Request) {
    const body = await request.json();
    const name = body.name;
    const price = body.price;
    const stock = body.stock;

    await db.product.create(
        { data: { name, price, stock } }
    );

    return Response.json(
        {}, { status: httpStatus.created }
    );
};