import { Sheet, SheetTrigger } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import { SidebarSheet } from "./sidebar-sheet";

import { MenuIcon } from "lucide-react";

import Image from "next/image";


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

                        <SidebarSheet />
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    );
};