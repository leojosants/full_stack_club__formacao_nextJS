import { BarbershopItem } from "../barbershop-item/barbershop-item";
import { BookingItem } from "../booking-item";
import { Search } from "../search/search";
import { MainProps } from "./main-props";

import { quickSearchOptions } from "../../_constants/search";

import { Button } from "../ui/button";

import Image from "next/image";


export const Main = (props: MainProps) => {
    const { barbershops, popularBarbershops } = props;

    return (
        <main>
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
                <BookingItem />

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
        </main>
    );
};