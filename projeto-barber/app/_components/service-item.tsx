import { BarbershopService } from "@prisma/client";


interface ServiceItemProps {
    service: BarbershopService;
};

export const ServiceItem = (props: ServiceItemProps) => {
    const { service } = props;

    return (
        <h1>
            {service.name}
        </h1>
    );
};