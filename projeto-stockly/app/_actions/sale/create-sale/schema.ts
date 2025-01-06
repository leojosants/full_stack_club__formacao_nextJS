import { z } from "zod";


export class ProductIsOutofStockError extends Error {
    constructor() {
        super("Product out of stock");
    };
};

export const createSaleSchema = z.object(
    {
        products: z.array(
            z.object(
                {
                    id: z.string().uuid(),

                    quantity: z.number().int().positive(),
                }
            ),
        ),
    }
);

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;