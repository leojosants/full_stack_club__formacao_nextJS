import { NextRequest } from "next/server";
import { db } from "@/app/_lib/prisma";


interface HttpStatusInterface {
    notFound: number;
    ok: number;
};

const httpStatus: HttpStatusInterface = {
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
            { message: "Product not found" }, { status: httpStatus.notFound }
        );
    }

    return Response.json(
        product, { status: httpStatus.ok }
    );
};

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const productId = params.id;

    await db.product.delete(
        { where: { id: productId } }
    );

    return Response.json(
        {}, { status: httpStatus.ok }
    );
};