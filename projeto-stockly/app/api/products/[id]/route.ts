/*
APENAS PARA REFERENCIA
*/

import { NextRequest } from "next/server";
import { db } from "@/app/_lib/prisma";


interface HttpStatusCodeInterface {
    notFound: number;
    ok: number;
};

const httpStatusCode: HttpStatusCodeInterface = {
    notFound: 404,
    ok: 200,
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("teste");

    console.log({ query });

    const productId = params.id;

    const product = await db.product.findUnique(
        { where: { id: productId } }
    );

    if (!product) {
        return Response.json(
            { message: "Product Not Found" }, { status: httpStatusCode.notFound }
        );
    }

    return Response.json(
        product, { status: httpStatusCode.ok }
    );
};

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await db.product.delete(
        { where: { id: params.id } }
    );

    return Response.json(
        { message: `Product id '${params.id}' deleted!` }, { status: httpStatusCode.ok }
    );
};