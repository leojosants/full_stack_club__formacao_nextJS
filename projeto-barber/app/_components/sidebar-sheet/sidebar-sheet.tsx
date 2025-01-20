"use client";

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";

import { sidedarSheetEndpoints } from "./sidebar-sheet-endpoints";

import { SignInDialog } from "../sign-in-dialog/sign-in-dialog";

import { quickSearchOptions } from "../../_constants/search";

import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";


export const SidebarSheet = () => {
    const { data } = useSession();

    const handleLogoutClick = async () => {
        await signOut();
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className={"text-left"}>
                    {"Menu"}
                </SheetTitle>
            </SheetHeader>

            <div className="py-5 border-b border-solid flex items-center gap-3 justify-between">
                {
                    data?.user
                        ? (
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={data?.user?.image ?? ""} />
                                </Avatar>

                                <div>
                                    <p className="font-bold">
                                        {data.user.name}
                                    </p>

                                    <p className="text-xs">
                                        {data.user.email}
                                    </p>
                                </div>
                            </div>
                        )
                        : (
                            <>
                                <h2 className="font-bold">
                                    {"Olá! Faça seu login!"}
                                </h2>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size={"icon"}>
                                            <LogInIcon />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className={"w-[90%]"}>
                                        <SignInDialog />
                                    </DialogContent>
                                </Dialog>
                            </>
                        )
                }
            </div>

            <div className={"flex flex-col gap-2 border-b border-solid py-5"}>
                <SheetClose asChild>
                    <Button className={"gap-2 justify-start"} variant={"ghost"} asChild>
                        <Link href={sidedarSheetEndpoints.home}>
                            <HomeIcon
                                size={18}
                            />

                            {"Início"}
                        </Link>
                    </Button>
                </SheetClose>

                <Button className={"gap-2 justify-start"} variant={"ghost"} asChild>
                    <Link href={sidedarSheetEndpoints.bookings}>
                        <CalendarIcon
                            size={18}
                        />

                        {"Agendamentos"}
                    </Link>
                </Button>
            </div>

            <div className={"flex flex-col gap-2 border-b border-solid py-5"}>
                {
                    quickSearchOptions.map(
                        (option) => (
                            <SheetClose key={option.title} asChild>
                                <Button
                                    className={"gap-2 justify-start"}
                                    variant={"ghost"}
                                    asChild
                                >
                                    <Link href={`${sidedarSheetEndpoints.barbershopsSearch}=${option.title}`}>
                                        <Image
                                            src={option.imageUrl}
                                            alt={option.title}
                                            height={18}
                                            width={18}
                                        />

                                        {option.title}
                                    </Link>
                                </Button>
                            </SheetClose>
                        )
                    )
                }
            </div>

            {
                data?.user && (

                    <div className={"flex flex-col gap-2 py-5"}>
                        <Button variant={"ghost"} className={"justify-start gap-2"} onClick={handleLogoutClick}>
                            <LogOutIcon size={18} />
                            {"Sair da conta"}
                        </Button>
                    </div>
                )
            }
        </SheetContent>
    );
};