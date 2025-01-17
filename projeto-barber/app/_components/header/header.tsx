import { SidebarSheet } from "../sidebar-sheet/sidebar-sheet";
import { headerEndpoints } from "./header-endpoints";

import { Sheet, SheetTrigger } from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import { MenuIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";


export const Header = () => {
    return (
        <header>
            <Card>
                <CardContent className={"flex flex-row items-center justify-between p-5"}>
                    <Link href={headerEndpoints.home}>
                        <Image
                            src={"/logo.png"}
                            alt={"Logo"}
                            height={18}
                            width={120}
                        />
                    </Link>

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