import { Barbershop } from "@prisma/client";


export interface MainProps {
    popularBarbershops: Barbershop[];
    barbershops: Barbershop[];
};