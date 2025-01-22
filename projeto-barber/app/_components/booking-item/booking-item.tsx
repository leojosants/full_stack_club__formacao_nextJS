"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import { deteleBooking } from "@/app/_server-actions/delete-booking/delete-booking";

import { toastNotification } from "@/app/helpers/toast-notification";
import { formatCurrency } from "@/app/helpers/currency";

import { BookingItemProps } from "./booking-item-props";
import { PhoneItem } from "../phone-item/phone-item";

import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useState } from "react";

import Image from "next/image";


export const BookingItem = (props: BookingItemProps): JSX.Element => {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const { booking } = props;
    const { service: { barbershop } } = booking;

    const isConfirmed = isFuture(booking.date);

    const handleCancelBooking = async (): Promise<void> => {
        try {
            await deteleBooking(booking.id);
            setIsSheetOpen(false);
            toastNotification("success", "Reserva cancelada com sucesso!");
        }
        catch (error) {
            console.error(error);
            toastNotification("success", "Erro ao cancelar reserva!");
        }
    };

    const handleSheetOpenChange = (isOpen: boolean): void => {
        setIsSheetOpen(isOpen);
    };

    return (
        <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger className={"w-full"}>
                <Card className={"min-w-[90%] hover:text-gray-400 transition-all duration-300 ease-in-out"}>
                    <CardContent className={"flex justify-between p-0"}>
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge className={"w-fit"} variant={isConfirmed ? "default" : "secondary"}>
                                {isConfirmed ? "Confirmado" : "Finalizado"}
                            </Badge>

                            <h3 className="font-semibold">
                                {booking.service.name}
                            </h3>

                            <div className="flex items-center gap-2">
                                <Avatar className={"h-6 w-6"}>
                                    <AvatarImage
                                        src={booking.service.barbershop.imageUrl}
                                    />
                                </Avatar>

                                <p className="text-sm">
                                    {booking.service.barbershop.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                            <p className="text-sm capitalize">
                                {
                                    format(
                                        booking.date, "MMMM", { locale: ptBR }
                                    )
                                }
                            </p>

                            <p className="text-2xl">
                                {
                                    format(
                                        booking.date, "dd", { locale: ptBR }
                                    )
                                }
                            </p>

                            <p className="text-sm">
                                {
                                    format(
                                        booking.date, "HH:mm", { locale: ptBR }
                                    )
                                }
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className={"w-[80%]"}>
                <SheetHeader>
                    <SheetTitle className={"text-left"}>
                        {"Informações da Reserva"}
                    </SheetTitle>
                </SheetHeader>

                <div className="relative mt-6 flex h-[180px] w-full items-end">
                    <Image
                        alt={`Mapa da barbearia ${barbershop.name}`}
                        className={"object-cover rounded-xl"}
                        src={"/map.png"}
                        fill
                    />

                    <Card className={"z-50 mx-5 mb-3 w-full rounded-xl"}>
                        <CardContent className={"px-5 py-3 flex items-center gap-3"}>
                            <Avatar>
                                <AvatarImage
                                    src={barbershop.imageUrl}
                                />
                            </Avatar>

                            <div>
                                <h3 className="font-bold">
                                    {barbershop.name}
                                </h3>

                                <p className="text-xs">
                                    {barbershop.address}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Badge className={"w-fit"} variant={isConfirmed ? "default" : "secondary"}>
                        {isConfirmed ? "Confirmado" : "Finalizado"}
                    </Badge>

                    <Card className={"mt-3 mb-6"}>
                        <CardContent className={"p-3 space-y-3"}>
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold">
                                    {booking.service.name}
                                </h2>

                                <p className="text-sm font-bold">
                                    {formatCurrency(Number(booking.service.price))}
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">
                                    {"Data"}
                                </h2>

                                <p className="text-sm">
                                    {
                                        format(
                                            booking.date, "d 'de' MMMM", { locale: ptBR }
                                        )
                                    }
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">
                                    {"Horário"}
                                </h2>

                                <p className="text-sm">
                                    {
                                        format(
                                            booking.date, "HH:mm", { locale: ptBR }
                                        )
                                    }
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">
                                    {"Barbearia"}
                                </h2>

                                <p className="text-sm">
                                    {barbershop.name}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        {
                            barbershop.phones.map(
                                (phone) => (
                                    <PhoneItem
                                        key={phone}
                                        phone={phone}
                                    />
                                )
                            )
                        }
                    </div>
                </div>

                <SheetFooter>
                    <div className="flex items-center gap-3 mt-6">
                        <SheetClose asChild>
                            <Button variant={"outline"} className={"w-full"}>
                                {"Voltar"}
                            </Button>
                        </SheetClose>

                        {
                            isConfirmed && (
                                <Dialog>
                                    <DialogTrigger className={"w-full"}>
                                        <Button variant={"destructive"} className={"w-full"}>
                                            {"Cancelar reserva"}
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className={"w-[90%]"}>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {"Realmente deseja cancelar sua reserva?"}
                                            </DialogTitle>

                                            <DialogDescription>
                                                {"Esta ação é irreversível!"}
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter className={"flex flex-row gap-3"}>
                                            <DialogClose asChild>
                                                <Button variant={"secondary"} className={"w-full"}>
                                                    {"Voltar"}
                                                </Button>
                                            </DialogClose>

                                            <DialogClose className={"w-full"}>
                                                <Button variant={"destructive"} onClick={handleCancelBooking} className={"w-full"}>
                                                    {"Confirmar"}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )
                        }
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
};