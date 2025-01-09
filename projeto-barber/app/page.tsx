import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Header } from "./_components/header";

import { SearchIcon } from "lucide-react";

import Image from "next/image";


const Home = () => {
    return (
        <div>
            <Header />

            <div className="p-5">
                <h2 className="text-xl font-bold">
                    Olá, Léo!
                </h2>

                <p>
                    Quinta-feira, 09 de janeiro.
                </p>

                <div className="mt-6 flex items-start gap-2">
                    <Input
                        placeholder={"Faça sua busca..."}
                    />

                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
            </div>

            <div className="relative mt-6 h-[150px] w-full">
                <Image
                    alt={"Agende nos melhores com FSW Barber"}
                    className={"rounded-xl object-cover"}
                    src={"/banner-01.png"}
                    fill
                />
            </div>
        </div>
    );
};

export default Home;