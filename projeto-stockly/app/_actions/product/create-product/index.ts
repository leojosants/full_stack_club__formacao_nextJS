"use server";
import { createProductSchema, CreateProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";



export const createProduct = async (data: CreateProductSchema) => {
    createProductSchema.parse(data);

    await db.product.create(
        { data }
    );

    revalidatePath("/products");
};