"use client";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

import { createBooking } from "@/app/_actions/create-booking/create-booking";

import { toastNotification } from "@/app/helpers/toast-notification";

import { formatCurrency } from "../../helpers/currency";

import { ServiceItemProps } from "./service-item-props";
import { TIME_LIST } from "./service-item-time-list";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useState } from "react";


export const ServiceItem = (props: ServiceItemProps) => {
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const { service, barbershop } = props;
    const { data } = useSession();

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return;

            const hour = Number(selectedTime.split(":")[0]);
            const minute = Number(selectedTime.split(":")[1]);

            const newDate = set(
                selectedDay, { minutes: minute, hours: hour }
            );

            await createBooking(
                {
                    serviceId: service.id,
                    userId: (data?.user as any).id,
                    date: newDate,
                }
            );

            toastNotification("success", "Reserva realizada com sucesso!");
        }
        catch (error) {
            console.error(error);
            toastNotification("error", "Erro ao realizar reserva!");
        }
    };

    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
                {/* image */}
                <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                    <Image
                        className={"object-cover rounded-lg"}
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                    />
                </div>

                {/* lado direito */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">
                        {service.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                            {formatCurrency(Number(service.price))}
                        </p>

                        <Sheet>
                            {
                                data?.user && (
                                    <SheetTrigger asChild>
                                        <Button variant={"secondary"} size={"sm"}>
                                            {"Reservar"}
                                        </Button>
                                    </SheetTrigger>
                                )
                            }

                            <SheetContent className={"px-0"}>
                                <SheetHeader>
                                    <SheetTitle>
                                        {"Fazer reserva"}
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="py-5 border-b border-solid">
                                    <Calendar
                                        onSelect={handleDateSelect}
                                        selected={selectedDay}
                                        mode={"single"}
                                        locale={ptBR}
                                        styles={
                                            {
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }
                                        }
                                    />
                                </div>

                                {
                                    selectedDay
                                        ? (
                                            <div className="flex gap-3 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden border-b border-solid">
                                                {
                                                    TIME_LIST.map(
                                                        (time) => (
                                                            <Button
                                                                className={"rounded-full hover:border-purple-300 transition-all duration-300 ease-in-out"}
                                                                variant={selectedTime === time ? "default" : "outline"}
                                                                onClick={() => handleTimeSelect(time)}
                                                                key={time}
                                                            >
                                                                {time}
                                                            </Button>
                                                        )
                                                    )
                                                }
                                            </div>
                                        )
                                        : (
                                            <p className="text-center p-5 text-sm text-purple-300 transition-all duration-300 ease-in-out">
                                                {"Selecione uma data e um horário para ver disponibilidades!"}
                                            </p>
                                        )
                                }

                                {
                                    selectedTime && selectedDay && (
                                        <>
                                            <div className="p-5">
                                                <Card>
                                                    <CardContent className={"p-3 space-y-3"}>
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">
                                                                {service.name}
                                                            </h2>

                                                            <p className="text-sm font-bold">
                                                                {formatCurrency(Number(service.price))}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">
                                                                {"Data"}
                                                            </h2>

                                                            <p className="text-sm">
                                                                {
                                                                    format(
                                                                        selectedDay, "d 'de' MMMM", { locale: ptBR }
                                                                    )
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">
                                                                {"Horário"}
                                                            </h2>

                                                            <p className="text-sm">
                                                                {selectedTime}
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
                                            </div>

                                            <SheetFooter className={"px-5 mt-10"}>
                                                <SheetClose asChild>
                                                    <Button onClick={handleCreateBooking}>
                                                        {"Confirmar"}
                                                    </Button>
                                                </SheetClose>
                                            </SheetFooter>
                                        </>
                                    )
                                }

                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};