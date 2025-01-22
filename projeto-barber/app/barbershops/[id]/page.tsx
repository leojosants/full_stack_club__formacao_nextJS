import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

import { SidebarSheet } from "@/app/_components/sidebar-sheet/sidebar-sheet";
import { ServiceItem } from "@/app/_components/service-item/service-item";
import { PhoneItem } from "@/app/_components/phone-item/phone-item";

import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/app/_lib/prisma";


interface Endpoints {
    home: string;
};

const endpoints: Endpoints = {
    home: "/",
};

interface BarbershopPageProps {
    params: {
        id: string;
    }
};

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const barbershop = await db.barbershop.findUnique(
        {
            where: { id: params.id },
            include: { services: true },
        }
    );

    if (!barbershop) {
        return notFound();
    }

    return (
        <div>
            {/* imagem */}
            <div className="relative w-full h-[250px]">
                <Image
                    src={barbershop?.imageUrl}
                    className={"object-cover"}
                    alt={barbershop.name}
                    fill
                />

                <Button size={"icon"} variant={"secondary"} className={"absolute left-4 top-4"} asChild>
                    <Link href={endpoints.home}>
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={"icon"} variant={"outline"} className={"absolute top-4 right-4"}>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SidebarSheet />
                </Sheet>
            </div>

            {/* título */}
            <div className="p-5 border-b border-solid">
                <h1 className="text-xl font-bold mb-3">
                    {barbershop.name}
                </h1>

                <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon
                        className={"text-primary"}
                        size={18}
                    />

                    <p className="text-sm">
                        {barbershop?.address}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon
                        className={"text-primary fill-primary"}
                        size={18}
                    />

                    <p className="text-sm">
                        {"5,0 (499 avaliações)"}
                    </p>
                </div>
            </div>

            {/* descrição */}
            <div className="space-y-2 border-b border-solid p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    {"Sobre nós"}
                </h2>

                <p className="text-justify text-sm">
                    {barbershop?.description}
                </p>
            </div>

            {/* serviços */}
            <div className="p-5 space-y-3 border-b border-solid">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    {"Serviços"}
                </h2>

                <div className="space-y-3">
                    {
                        barbershop.services.map(
                            (service) => (
                                <ServiceItem
                                    barbershop={JSON.parse(JSON.stringify(barbershop))}
                                    service={JSON.parse(JSON.stringify(service))}
                                    key={service.id}
                                />
                            )
                        )
                    }
                </div>
            </div>

            {/* contato */}
            <div className="p-5 space-y-3">
                {
                    barbershop.phones.map(
                        (phone) => (
                            <PhoneItem phone={phone} key={phone} />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default BarbershopPage;