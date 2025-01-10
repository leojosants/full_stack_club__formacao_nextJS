import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Card, CardContent } from "./_components/ui/card";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Badge } from "./_components/ui/badge";

import { BarbershoptItem } from "./_components/barbershopt-item";
import { Header } from "./_components/header";

import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react";

import Image from "next/image";

import { db } from "./_lib/prisma";


const Home = async () => {
    const barbershops = await db.barbershop.findMany({});

    const popularBarbershops = await db.barbershop.findMany(
        {
            orderBy: { name: "desc" },
        }
    );

    return (
        <div>
            {/* inicio header */}
            <Header />
            {/* fim - header */}


            <div className="p-5">
                {/* inicio - texto */}
                <h2 className="text-xl font-bold">
                    {"Olá, Léo!"}
                </h2>

                <p>
                    {"Quinta-feira, 09 de janeiro."}
                </p>
                {/* fim - texto */}


                {/* inicio - busca */}
                <div className="mt-6 flex items-start gap-2">
                    <Input
                        placeholder={"Faça sua busca..."}
                    />

                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
                {/* fim - busca */}


                {/* inicio - busca rápida */}
                <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/cabelo.svg"} width={16} height={16} alt={"Cabelo"}
                        />
                        {"Cabelo"}
                    </Button>

                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/barba.svg"} width={16} height={16} alt={"Barba"}
                        />
                        {"Barba"}
                    </Button>

                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/acabamento.svg"} width={16} height={16} alt={"Acabamento"}
                        />
                        {"Acabamento"}
                    </Button>

                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/massagem.svg"} width={16} height={16} alt={"Massagem"}
                        />
                        {"Massagem"}
                    </Button>

                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/sobrancelha.svg"} width={16} height={16} alt={"Sobrancelha"}
                        />
                        {"Sobrancelha"}
                    </Button>

                    <Button className={"gap-2"} variant={"secondary"}>
                        <Image
                            src={"/hidratacao.svg"} width={16} height={16} alt={"Hidratação"}
                        />
                        {"Hidratação"}
                    </Button>
                </div>
                {/* fim - busca rápida */}


                {/* inicio - imagem */}
                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        alt={"Agende nos melhores com FSW Barber"}
                        className={"rounded-xl object-cover"}
                        src={"/banner-01.png"}
                        fill
                    />
                </div>
                {/* fim - imagem */}


                {/* inicio - agendamentos */}
                <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Agendamentos"}
                </h2>

                <Card>
                    <CardContent className={"flex justify-between p-0"}>
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge className={"w-fit"}>
                                {"Confirmado"}
                            </Badge>

                            <h3 className="font-semibold">
                                {"Corte de Cabelo"}
                            </h3>

                            <div className="flex items-center gap-2">
                                <Avatar className={"h-6 w-6"}>
                                    <AvatarImage
                                        src={"https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"}
                                    />
                                </Avatar>

                                <p className="text-sm">
                                    {"Barbearis FSW"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                            <p className="text-sm">
                                {"Agosto"}
                            </p>

                            <p className="text-2xl">
                                {"05"}
                            </p>

                            <p className="text-sm">
                                {"20:00"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Recomendados"}
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {
                        barbershops.map(
                            (barbershop) => (
                                <BarbershoptItem
                                    barbershop={barbershop} key={barbershop.id}
                                />
                            )
                        )
                    }
                </div>

                <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Populares"}
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {
                        popularBarbershops.map(
                            (barbershop) => (
                                <BarbershoptItem
                                    barbershop={barbershop} key={barbershop.id}
                                />
                            )
                        )
                    }
                </div>
                {/* fim - agendamentos */}
            </div>

            <footer>
                <Card>
                    <CardContent className={"px-6 py-5"}>
                        <p className="text-sm text-gray-400">
                            &copy; {"2025 Copyright"} <span className="font-bold">{"FSW Barber"}</span>
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    );
};

export default Home;