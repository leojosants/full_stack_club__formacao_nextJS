// shadcn
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Card, CardContent } from "./_components/ui/card";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Badge } from "./_components/ui/badge";

// _components
import { Header } from "./_components/header";

// lucide-react
import { SearchIcon } from "lucide-react";

// next
import Image from "next/image";


const Home = () => {
    return (
        <div>
            <Header />

            <div className="p-5">
                <h2 className="text-xl font-bold">
                    {"Olá, Léo!"}
                </h2>

                <p>
                    {"Quinta-feira, 09 de janeiro."}
                </p>

                <div className="mt-6 flex items-start gap-2">
                    <Input
                        placeholder={"Faça sua busca..."}
                    />

                    <Button>
                        <SearchIcon />
                    </Button>
                </div>


                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        alt={"Agende nos melhores com FSW Barber"}
                        className={"rounded-xl object-cover"}
                        src={"/banner-01.png"}
                        fill
                    />
                </div>

                <Card className="mt-6">
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
            </div>
        </div>
    );
};

export default Home;