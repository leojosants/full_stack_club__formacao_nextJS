import { Barbershop, BarbershopService } from "@prisma/client";


export interface ServiceItemProps {
    barbershop: Pick<Barbershop, "name">,
    service: BarbershopService;
};