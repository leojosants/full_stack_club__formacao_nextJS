"use server";
import { upsertProductSchema, UpsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


export const upsertProduct = async (data: UpsertProductSchema) => {
    upsertProductSchema.parse(data);

    await db.product.upsert(
        {
            where: { id: data?.id ?? "" },
            update: data,
            create: data,
        }
    );

    revalidatePath("/products");
};