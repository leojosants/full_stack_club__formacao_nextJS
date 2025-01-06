"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


export const deleteSale = actionClient
    .schema(deleteSaleSchema)
    .action(
        async ({ parsedInput: { id } }) => {
            await db.sale.delete(
                { where: { id } }
            );

            revalidatePath("/sales");
        }
    );