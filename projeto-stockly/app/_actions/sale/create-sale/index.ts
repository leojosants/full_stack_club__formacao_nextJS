"use server";
import { createSaleSchema, CreateSaleSchema, ProductIsOutofStockError } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";


interface CreateSaleResponseInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
};

export const createSale = async (data: CreateSaleSchema): Promise<CreateSaleResponseInterface> => {
    createSaleSchema.parse(data);

    const response: CreateSaleResponseInterface = {
        error: null,
        data: null,
    };

    await db.$transaction(
        async (trx) => {
            const sale = await trx.sale.create(
                { data: { date: new Date() } }
            );

            for (const product of data.products) {
                const productFromDB = (
                    await db.product.findUnique(
                        { where: { id: product.id } }
                    )
                );

                if (!productFromDB) {
                    return response.error = "Product not found!";
                }

                const productIsOutOfStock = product.quantity > productFromDB.stock;

                if (productIsOutOfStock) {
                    return (
                        response.error = new ProductIsOutofStockError().message
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

            response.data = sale;
        }
    );

    revalidatePath("/products");

    return response;
};