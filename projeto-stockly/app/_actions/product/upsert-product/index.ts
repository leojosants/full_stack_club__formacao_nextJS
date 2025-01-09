"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { upsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


interface EndpointsInterface {
    products: string;
    home: string;
};

const endpoints: EndpointsInterface = {
    products: "/products",
    home: "/",
};

export const upsertProduct = actionClient
    .schema(upsertProductSchema)
    .action(
        async ({ parsedInput: { id, ...data } }) => {
            upsertProductSchema.parse(data);

            await db.product.upsert(
                {
                    where: { id: id ?? "" },
                    update: data,
                    create: data,
                }
            );

            revalidatePath(endpoints.products, "page");
            revalidatePath(endpoints.home);
        }
    );