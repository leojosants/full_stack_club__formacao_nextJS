import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { Barbershop } from "@prisma/client";

import { StarIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";


interface Endpoints {
    barbershopsId: string;
};

const endpoints: Endpoints = {
    barbershopsId: "/barbershops",
};

interface BarbershoptItemProps {
    barbershop: Barbershop;
};

export const BarbershoptItem = (props: BarbershoptItemProps) => {
    const { barbershop } = props;

    return (
        <Card className={"min-w-[167px] roude2xl"}>
            <CardContent className={"p-0 px-1 pt-1"}>
                <div className="relative h-[159px] w-full">
                    <Image
                        className={"object-cover rounded-2xl"}
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        fill
                    />

                    <Badge className={"absolute left-2 top-2 space-x-1"} variant={"secondary"}>
                        <StarIcon
                            className={"fill-primary text-primary"}
                            size={12}
                        />

                        <p className="text-xs font-semibold">
                            {"5,0"}
                        </p>
                    </Badge>
                </div>

                <div className="px-1 py-3">
                    <h3 className="font-semibold truncate">
                        {barbershop.name}
                    </h3>

                    <p className="text-sm text-gray-400 truncate">
                        {barbershop.address}
                    </p>

                    <Button variant={"secondary"} className={"mt-3 w-full"} asChild>
                        <Link href={`${endpoints.barbershopsId}/${barbershop.id}`}>
                            {"Reservar"}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};