import { Sheet, SheetContent,  SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import { CalendarIcon, HomeIcon, MenuIcon } from "lucide-react";

import Image from "next/image";


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

                            <div className={"flex flex-col gap-2 py-5 border-b border-solid"}>
                                <Button className={"gap-2 justify-start"}>
                                    <HomeIcon size={18}/>
                                    {"Início"}
                                </Button>

                                <Button className={"gap-2 justify-start"} variant={"ghost"}>
                                    <CalendarIcon size={18}/>
                                    {"Agendamentos"}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    );
};