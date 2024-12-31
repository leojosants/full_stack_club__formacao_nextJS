import "server-only";
import { Product } from "@prisma/client";
import { db } from "@/app/_lib/prisma";


export const getProducts = async (): Promise<Product[]> => {
    return db.product.findMany({});
};