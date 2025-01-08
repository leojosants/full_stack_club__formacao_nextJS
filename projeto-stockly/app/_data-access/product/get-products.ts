import "server-only";
import { Product } from "@prisma/client";
import { db } from "@/app/_lib/prisma";


export type ProductStatusDTO = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDTO extends Product {
    status: ProductStatusDTO;
};

export const getProducts = async (): Promise<ProductDTO[]> => {
    const products = await db.product.findMany({});

    return products.map(
        (product) => (
            { ...product, status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK" }
        )
    );
};