import { formatCurrency } from "../../helpers/currency";

import { ServiceItemProps } from "./service-item-props";

import { Card, CardContent } from "../ui/card";

import { Button } from "../ui/button";

import Image from "next/image";


export const ServiceItem = (props: ServiceItemProps) => {
    const { service } = props;

    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
                {/* image */}
                <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                    <Image
                        alt={service.name}
                        src={service.imageUrl}
                        fill
                        className={"object-cover rounded-lg"}
                    />
                </div>

                {/* lado direito */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">
                        {service.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                            {formatCurrency(Number(service.price))}
                        </p>

                        <Button variant={"secondary"} size={"sm"}>
                            {"Reservar"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};