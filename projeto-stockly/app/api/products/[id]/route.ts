/*
APENAS PARA REFERENCIA
*/

import { httpStatusCode } from "@/app/_helpers/http-status-code";
import { NextRequest } from "next/server";
import { db } from "@/app/_lib/prisma";


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