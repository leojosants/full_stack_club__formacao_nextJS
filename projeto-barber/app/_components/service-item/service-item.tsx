"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { Dialog, DialogContent } from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

import { createBooking } from "@/app/_server-actions/create-booking/create-booking";
import { getBookings } from "@/app/_server-actions/get-bookings/get-bookings";

import { toastNotification } from "@/app/helpers/toast-notification";

import { BookingSummary } from "../booking-summary/booking-summary";
import { SignInDialog } from "../sign-in-dialog/sign-in-dialog";
import { getTimeList } from "./service-item-get-time-list";
import { ServiceItemProps } from "./service-item-props";

import { formatCurrency } from "../../helpers/currency";

import { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { Booking } from "@prisma/client";

import { ptBR } from "date-fns/locale";
import { set } from "date-fns";


export const ServiceItem = (props: ServiceItemProps): JSX.Element => {
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState<boolean>(false);
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);

    const { service, barbershop } = props;
    const { data } = useSession();

    const serviceId: string = service.id;

    const timeList: string[] = useMemo(
        () => {
            if (!selectedDay) {
                return [];
            }

            return getTimeList(
                { bookings: dayBookings, selectedDay }
            );
        }, [dayBookings, selectedDay]
    );

    const selectedDate: Date | undefined = useMemo(
        () => {

            if (!selectedDay || !selectedTime) {
                return;
            }

            return set(
                selectedDay,
                {
                    hours: Number(selectedTime?.split(":")[0]),
                    minutes: Number(selectedTime?.split(":")[1]),
                }
            )

        }, [selectedDay, selectedTime]
    );

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

    const handleBookingSheetOpenChange = (): void => {
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
            if (!selectedDate) return;

            await createBooking(
                {
                    serviceId: service.id,
                    date: selectedDate,
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

    const handleBookingClick = (): void => {
        if (data?.user) {
            return setBookingSheetIsOpen(true);
        }

        return setSignInDialogIsOpen(true);
    }

    return (
        <>
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
                                <Button variant={"secondary"} size={"sm"} onClick={handleBookingClick}>
                                    {"Reservar"}
                                </Button>

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
                                            fromDate={new Date()}
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
                                                        timeList.length > 0
                                                            ? (
                                                                timeList.map(
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
                                                            )
                                                            : (
                                                                <p className="text-center p-5 text-sm text-purple-300 transition-all duration-300 ease-in-out">
                                                                    {"Não há horários disponíveis para este dia."}
                                                                </p>
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
                                        selectedDate && (
                                            <>
                                                <div className="p-5">
                                                    <BookingSummary
                                                        selectedDate={selectedDate}
                                                        barbershop={barbershop}
                                                        service={service}
                                                    />
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

            <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
                <DialogContent className={"w-[90%]"}>
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    );
};