import { z } from "zod";


export const formSearch = z.object(
    {
        title: z
            .string()
            .trim()
            .min(1, { message: "Digite algo para buscar." }),
    }
);

export type SearchSchema = z.infer<typeof formSearch>;