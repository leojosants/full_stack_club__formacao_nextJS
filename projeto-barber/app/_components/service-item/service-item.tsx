"use client";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

import { createBooking } from "@/app/_server-actions/create-booking/create-booking";
import { getBookings } from "@/app/_server-actions/get-bookings/get-bookings";

import { toastNotification } from "@/app/helpers/toast-notification";

import { getTimeList } from "./service-item-get-time-list";
import { ServiceItemProps } from "./service-item-props";

import { formatCurrency } from "../../helpers/currency";

import { addDays, format, set } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { useEffect, useState } from "react";

import { Booking } from "@prisma/client";


export const ServiceItem = (props: ServiceItemProps): JSX.Element => {
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);

    const { service, barbershop } = props;
    const { data } = useSession();

    const serviceId = service.id;

    useEffect(
        () => {
            const fetch = async () => {
                if (!selectedDay) {
                    return;
                }

                const bookings = await getBookings(
                    { date: selectedDay, serviceId }
                );
                setDayBookings(bookings);
            };

            fetch();
        }, [selectedDay, serviceId]
    );

    const handleBookingSheetOpenChange = () => {
        setBookingSheetIsOpen(false);
        setSelectedTime(undefined);
        setSelectedDay(undefined);
        setDayBookings([]);
    };

    const handleDateSelect = (date: Date | undefined): void => {
        setSelectedDay(date);
    };

    const handleTimeSelect = (time: string): void => {
        setSelectedTime(time);
    };

    const handleCreateBooking = async (): Promise<void> => {
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

            handleBookingSheetOpenChange();

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

                        <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChange}>
                            {
                                data?.user && (
                                    <Button variant={"secondary"} size={"sm"} onClick={() => setBookingSheetIsOpen(true)}>
                                        {"Reservar"}
                                    </Button>
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
                                        fromDate={addDays(new Date(), 1)}
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
                                                    getTimeList(dayBookings).map(
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
                                                <Button onClick={handleCreateBooking}>
                                                    {"Confirmar"}
                                                </Button>
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