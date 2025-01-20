import { BarbershopItem } from "./_components/barbershop-item/barbershop-item";
import { BookingItem } from "./_components/booking-item/booking-item";
import { Header } from "./_components/header/header";
import { Search } from "./_components/search/search";

import { quickSearchOptions } from "./_constants/search";

import { Button } from "./_components/ui/button";

import { homeEndpoints } from "./home-endpoints";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { authOptions } from "./_lib/auth";
import { db } from "./_lib/prisma";


const Home = async () => {
    const session = await getServerSession(authOptions);
    const barbershops = await db.barbershop.findMany({});

    const popularBarbershops = await db.barbershop.findMany(
        {
            orderBy: {
                name: "desc",
            },
        }
    );

    const bookings = session?.user
        ? (
            await db.booking.findMany(
                {
                    where: {
                        userId: (session.user as any).id
                    },
                    include: {
                        service: {
                            include: {
                                barbershop: true,
                            },
                        },
                    },
                }
            )
        )
        : [];

    return (
        <div>
            <Header />

            <div className="p-5">
                {/* texto */}
                <h2 className="text-xl font-bold">
                    {"Olá, Léo!"}
                </h2>

                <p>
                    {"Quinta-feira, 09 de janeiro."}
                </p>

                {/* busca */}
                <div className="mt-6">
                    <Search placeholder={"Faça sua busca..."} />
                </div>

                {/* busca rápida */}
                <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {
                        quickSearchOptions.map(
                            (option) => (
                                <Button className={"gap-2"} variant={"secondary"} key={option.title} asChild>
                                    <Link href={`${homeEndpoints.barbershopsSearch}=${option.title}`}>
                                        <Image

                                            src={option.imageUrl}
                                            alt={option.title}
                                            height={16}
                                            width={16}
                                        />
                                        {option.title}
                                    </Link>
                                </Button>
                            )
                        )
                    }
                </div>

                {/* imagem */}
                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        alt={"Agende nos melhores com FSW Barber"}
                        className={"rounded-xl object-cover"}
                        src={"/banner-01.png"}
                        fill
                    />
                </div>

                {/* agendamentos */}
                <div className="flex overflow-x-auto">
                    {
                        bookings.map(
                            (booking) => (
                                <BookingItem
                                    key={booking.id} booking={booking}
                                />
                            )
                        )
                    }
                </div>

                {/* recomendados */}
                <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Recomendados"}
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {
                        barbershops.map(
                            (barbershop) => (
                                <BarbershopItem
                                    barbershop={barbershop}
                                    key={barbershop.id}
                                />
                            )
                        )
                    }
                </div>

                {/* - populares */}
                <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Populares"}
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {
                        popularBarbershops.map(
                            (barbershop) => (
                                <BarbershopItem
                                    barbershop={barbershop}
                                    key={barbershop.id}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;