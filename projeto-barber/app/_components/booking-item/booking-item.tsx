import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

import { BookingItemProps } from "./booking-item-props";

import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";


export const BookingItem = (props: BookingItemProps): JSX.Element => {
    const { booking } = props;
    const isConfirmed = isFuture(booking.date);

    return (
        <Sheet>
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

            <SheetContent className={"w-[90%]"}>
                <SheetHeader>
                    <SheetTitle className={"text-left"}>
                        {"Informações da Reserva"}
                    </SheetTitle>
                </SheetHeader>

                <div className="relative h-[180px] w-full">
                    <Image
                        alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
                        className={"object-cover"}
                        src={"/map.png"}
                        fill
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
};