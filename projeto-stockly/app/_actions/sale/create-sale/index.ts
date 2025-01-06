"use server";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/app/_lib/safe-action";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


export const createSale = actionClient
    .schema(createSaleSchema)
    .action(
        async ({ parsedInput: { products } }) => {
            await db.$transaction(
                async (trx) => {
                    const sale = await trx.sale.create(
                        { data: { date: new Date() } }
                    );

                    for (const product of products) {
                        const productFromDB = (
                            await db.product.findUnique(
                                { where: { id: product.id } }
                            )
                        );

                        if (!productFromDB) {
                            returnValidationErrors(
                                createSaleSchema, { _errors: ["Product not found!"] }
                            );
                        }

                        const productIsOutOfStock = product.quantity > productFromDB.stock;

                        if (productIsOutOfStock) {
                            returnValidationErrors(
                                createSaleSchema, { _errors: ["Product out of stock"] }
                            );
                        }

                        await trx.saleProduct.create(
                            {
                                data: {
                                    unitPrice: productFromDB.price,
                                    quantity: product.quantity,
                                    productId: product.id,
                                    saleId: sale.id,
                                }
                            }
                        );

                        await trx.product.update(
                            {
                                where: { id: product.id },
                                data: {
                                    stock: { decrement: product.quantity }
                                },
                            }
                        );
                    }
                }
            );

            revalidatePath("/products");
        }
    );