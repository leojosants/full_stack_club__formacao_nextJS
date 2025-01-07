"use server";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/app/_lib/safe-action";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


export const upsertSale = actionClient
    .schema(upsertSaleSchema)
    .action(
        async ({ parsedInput: { products, id } }) => {
            const isUpdate = Boolean(id);

            await db.$transaction(
                async (trx) => {
                    if (isUpdate) {
                        const existingSale = await trx.sale.findUnique(
                            {
                                where: { id },
                                include: { saleProducts: true },
                            }
                        );

                        if (!existingSale) return;

                        await trx.sale.delete(
                            { where: { id } }
                        );

                        for (const product of existingSale?.saleProducts) {
                            await trx.product.update(
                                {
                                    where: { id: product.productId },
                                    data: {
                                        stock: { increment: product.quantity },
                                    },
                                }
                            );
                        }
                    }

                    const sale = await trx.sale.create(
                        { data: { date: new Date() } }
                    );

                    for (const product of products) {
                        const productFromDB = (
                            await trx.product.findUnique(
                                { where: { id: product.id } }
                            )
                        );

                        if (!productFromDB) {
                            returnValidationErrors(
                                upsertSaleSchema, { _errors: ["Product not found!"] }
                            );
                        }

                        const productIsOutOfStock = product.quantity > productFromDB.stock;

                        if (productIsOutOfStock) {
                            returnValidationErrors(
                                upsertSaleSchema, { _errors: ["Product out of stock"] }
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
            revalidatePath("/sales");
            revalidatePath("/");
        }
    );