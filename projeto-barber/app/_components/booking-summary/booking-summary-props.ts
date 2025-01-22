import { Barbershop, BarbershopService } from "@prisma/client";


export interface BookingSummaryProps {
    service: Pick<BarbershopService, "name" | "price">;
    barbershop: Pick<Barbershop, "name">;
    selectedDate: Date;
};