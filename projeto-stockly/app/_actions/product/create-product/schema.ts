import { z } from "zod";


export const createProductSchema = z.object(
    {
        name: z.string().trim()
            .min(2, { message: "O nome do produto é obrigatório." }),

        price: z.number()
            .min(0.01, { message: "O preço do produto é obrigatório." }),

        stock: z.coerce.number().int()
            .positive({ message: "A quantidade em estoque deve ser positiva." })
            .min(0, { message: "A quantidade em estoque do produto é obrigatório." }),
    }
);

export type CreateProductSchema = z.infer<typeof createProductSchema>;