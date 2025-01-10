import { BarbershoptItem } from "./_components/barbershopt-item";
import { BookingItem } from "./_components/booking-item";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";

import { quickSearchOptions } from "./_constants/search";

import { SearchIcon } from "lucide-react";

import { db } from "./_lib/prisma";

import Image from "next/image";


const Home = async () => {
    const barbershops = await db.barbershop.findMany({});

    const popularBarbershops = await db.barbershop.findMany(
        {
            orderBy: { name: "desc" },
        }
    );

    return (
        <div>
            {/* header */}
            <header>
                <Header />
            </header>

            {/* principal */}
            <main>
                <div className="p-5">
                    {/* - texto */}
                    <h2 className="text-xl font-bold">
                        {"Olá, Léo!"}
                    </h2>

                    <p>
                        {"Quinta-feira, 09 de janeiro."}
                    </p>

                    {/* - busca */}
                    <div className="mt-6 flex items-start gap-2">
                        <Input
                            placeholder={"Faça sua busca..."}
                        />

                        <Button>
                            <SearchIcon />
                        </Button>
                    </div>

                    {/* - busca rápida */}
                    <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                        {
                            quickSearchOptions.map(
                                (option) => (
                                    <Button className={"gap-2"} variant={"secondary"} key={option.title}>
                                        <Image

                                            src={option.imageUrl}
                                            alt={option.title}
                                            height={16}
                                            width={16}
                                        />
                                        {option.title}
                                    </Button>
                                )
                            )
                        }
                    </div>

                    {/* - imagem */}
                    <div className="relative mt-6 h-[150px] w-full">
                        <Image
                            alt={"Agende nos melhores com FSW Barber"}
                            className={"rounded-xl object-cover"}
                            src={"/banner-01.png"}
                            fill
                        />
                    </div>

                    {/* - agendamentos */}
                    <BookingItem />

                    {/* - recomendados */}
                    <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                        {"Recomendados"}
                    </h2>

                    <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                        {
                            barbershops.map(
                                (barbershop) => (
                                    <BarbershoptItem
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
                                    <BarbershoptItem
                                        barbershop={barbershop}
                                        key={barbershop.id}
                                    />
                                )
                            )
                        }
                    </div>
                </div>
            </main>

            {/* footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Home;