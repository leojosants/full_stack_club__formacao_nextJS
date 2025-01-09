/*
APENAS PARA REFERENCIA
*/

import { httpStatusCode } from "@/app/_helpers/http-status-code";
import { db } from "@/app/_lib/prisma";


export async function GET() {
    await new Promise(
        (resolve) => setTimeout(resolve, 3000)
    );

    const products = await db.product.findMany({});

    return Response.json(
        products, { status: httpStatusCode.ok }
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
        {}, { status: httpStatusCode.created }
    );
};