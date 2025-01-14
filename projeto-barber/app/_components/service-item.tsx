import { BarbershopService } from "@prisma/client";
import Image from "next/image";


interface ServiceItemProps {
    service: BarbershopService;
};

export const ServiceItem = (props: ServiceItemProps) => {
    const { service } = props;

    return (
        <div className="flex items-center gap-2">
            <div className="relative h-[110px] w-[110px]">
                <Image
                    alt={service.name}
                    src={service.imageUrl}
                    fill
                    className={"object-cover"}
                />
            </div>
        </div>
    );
};