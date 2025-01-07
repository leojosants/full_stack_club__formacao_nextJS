import { z } from "zod";


export class ProductIsOutofStockError extends Error {
    constructor() {
        super("Product out of stock");
    };
};

export const upsertSaleSchema = z.object(
    {
        id: z
            .string()
            .uuid()
            .optional(),

        products: z.array(
            z.object(
                {
                    id: z
                        .string()
                        .uuid(),

                    quantity: z
                        .number()
                        .int()
                        .positive(),
                }
            ),
        ),
    }
);

export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;