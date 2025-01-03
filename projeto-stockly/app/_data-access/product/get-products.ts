import "server-only";
import { unstable_cache } from "next/cache";
import { Product } from "@prisma/client";
import { db } from "@/app/_lib/prisma";


export const getProducts = async (): Promise<Product[]> => {
    console.log("fetching products...");
    return db.product.findMany({});
};

export const cachedGetProducts = unstable_cache(
    getProducts,
    ["getProducts"],
    {
        tags: ["get-products"],
        revalidate: 60,
    }
);

export const cachedGetRandomNuber = unstable_cache(
    async () => {
        await new Promise(
            (resolve) => setTimeout(resolve, 1000)
        );

        return Math.random();
    },
    ["getRandomNumber"],
    {
        tags: ["get-random-number"],
        revalidate: 60,
    }
);