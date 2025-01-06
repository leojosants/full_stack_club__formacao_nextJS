"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { deleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


export const deleteProduct = actionClient
    .schema(deleteProductSchema)
    .action(
        async ({ parsedInput: { id } }) => {
            await db.product.delete(
                { where: { id } }
            );

            revalidatePath("/products");
        }
    );