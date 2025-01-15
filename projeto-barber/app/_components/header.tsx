import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";

import { quickSearchOptions } from "../_constants/search";

import Image from "next/image";
import Link from "next/link";


interface Endpoints {
    home: string;
}

const endpoints: Endpoints = {
    home: "/",
}

export const Header = () => {
    return (
        <header>
            <Card>
                <CardContent className={"flex flex-row items-center justify-between p-5"}>
                    <Image
                        src={"/logo.png"}
                        alt={"Logo"}
                        height={18}
                        width={120}
                    />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size={"icon"} variant={"outline"}>
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>

                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className={"text-left"}>Menu</SheetTitle>
                            </SheetHeader>

                            <div className="py-5 border-b border-solid flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                                </Avatar>

                                <div>
                                    <p className="font-bold">
                                        {"Nome"}
                                    </p>

                                    <p className="text-xs">
                                        {"email"}
                                    </p>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-2 border-b border-solid py-5"}>
                                <SheetClose asChild>
                                    <Button className={"gap-2 justify-start"} variant={"ghost"} asChild>
                                        <Link href={endpoints.home}>
                                            <HomeIcon
                                                size={18}
                                            />

                                            {"Início"}
                                        </Link>
                                    </Button>
                                </SheetClose>

                                <Button className={"gap-2 justify-start"} variant={"ghost"}>
                                    <CalendarIcon size={18} />
                                    {"Agendamentos"}
                                </Button>
                            </div>

                            <div className={"flex flex-col gap-2 border-b border-solid py-5"}>
                                {
                                    quickSearchOptions.map(
                                        (option) => (
                                            <Button
                                                className={"gap-2 justify-start"}
                                                key={option.title}
                                                variant={"ghost"}
                                            >
                                                <Image
                                                    src={option.imageUrl}
                                                    alt={option.title}
                                                    height={18}
                                                    width={18}
                                                />

                                                {option.title}
                                            </Button>
                                        )
                                    )
                                }
                            </div>

                            <div className={"flex flex-col gap-2 py-5"}>
                                <Button variant={"ghost"} className={"justify-start gap-2"}>
                                    <LogOutIcon size={18} />
                                    {"Sair da conta"}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    );
};