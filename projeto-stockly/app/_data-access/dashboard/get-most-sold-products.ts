import "server-only"
import { ProductStatusDTO } from "../product/get-products";
import { db } from "@/app/_lib/prisma";


export interface MostSoldProductDTO {
    status: ProductStatusDTO;
    totalSold: number;
    productId: string;
    price: number;
    name: string;
};

export const getMostSoldProducts = async (): Promise<MostSoldProductDTO[]> => {
    await new Promise(
        (resolve) => setTimeout(resolve, 2000)
    );

    const mostSoldProductQuery = `
        SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
        FROM "SaleProduct"
        JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
        GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
        ORDER BY "totalSold" DESC
        LIMIT 5;
    `;

    const mostSoldProducts = await db.$queryRawUnsafe<{ productId: string, name: string; totalSold: number, stock: number, price: number }[]>(mostSoldProductQuery);

    return mostSoldProducts.map(
        (product) => (
            {
                ...product,
                totalSold: Number(product.totalSold),
                price: Number(product.price),
                status: product.totalSold > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
            }
        )
    );
};