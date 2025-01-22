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

import { ptBR } from "date-fns/locale";
import { format } from "date-fns";


const Home = async () => {
    const session = await getServerSession(authOptions);
    const barbershops = await db.barbershop.findMany({});
    const currentDate = new Date();

    const popularBarbershops = await db.barbershop.findMany(
        {
            orderBy: {
                name: "desc",
            },
        }
    );

    const confirmedBookings = session?.user
        ? (
            await db.booking.findMany(
                {
                    where: {
                        userId: (session.user as any).id,
                        date: {
                            gte: currentDate,
                        },
                    },
                    include: {
                        service: {
                            include: {
                                barbershop: true,
                            },
                        },
                    },
                    orderBy: {
                        date: "asc",
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
                <h2 className="text-xl font-bold text-primary">
                    {
                        `Olá, ${session?.user
                            ? `${session?.user?.name}!`
                            : "Bem-vindo(a)!"}`
                    }
                </h2>

                <p>
                    <span className="capitalize text-sm">
                        {
                            format(
                                currentDate, "EEEE, dd", { locale: ptBR }
                            )
                        }
                    </span>

                    <span className="text-sm">
                        {" de "}
                    </span>

                    <span className="capitalize text-sm">
                        {
                            format(
                                currentDate, "MMMM", { locale: ptBR }
                            )
                        }
                    </span>
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
                {
                    confirmedBookings.length > 0 && (
                        <>
                            <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                                {"Agendamentos"}
                            </h2>

                            <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
                                {
                                    confirmedBookings.map(
                                        (booking) => (
                                            <BookingItem
                                                booking={JSON.parse(JSON.stringify(booking))}
                                                key={booking.id}
                                            />
                                        )
                                    )
                                }
                            </div>
                        </>
                    )
                }

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