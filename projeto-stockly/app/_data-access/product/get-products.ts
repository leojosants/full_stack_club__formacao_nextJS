import "server-only";
import { unstable_cache } from "next/cache";
import { Product } from "@prisma/client";
import { db } from "@/app/_lib/prisma";


export const getProducts = async (): Promise<Product[]> => {
    return db.product.findMany({});
};

export const cachedGetProducts = unstable_cache(
    getProducts, ["get-products"], { revalidate: 5 }
);