import { BookingItem } from "../_components/booking-item/booking-item";
import { Header } from "../_components/header/header";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "../_lib/auth";

import { db } from "../_lib/prisma";


const Bookings = async (): Promise<JSX.Element> => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return notFound();
    }

    const confirmedBookings = await db.booking.findMany(
        {
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date(),
                },
            },
            include: {
                service: {
                    include: {
                        barbershop: true,
                    },
                },
            },
            orderBy: {
                date: "asc",
            },
        }
    );

    const concludedBookings = await db.booking.findMany(
        {
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date(),
                },
            },
            include: {
                service: {
                    include: {
                        barbershop: true,
                    },
                },
            },
            orderBy: {
                date: "asc",
            },
        }
    );

    return (
        <>
            <Header />

            <div className="p-5 space-y-3">
                <h1 className="text-xl font-bold">
                    {"Agendamentos"}
                </h1>

                {
                    confirmedBookings.length > 0 && (
                        <>
                            <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                                {"Confirmados"}
                            </h2>

                            {
                                confirmedBookings.map(
                                    (booking) => (
                                        <BookingItem
                                            booking={JSON.parse(JSON.stringify(booking))}
                                            key={booking.id}
                                        />
                                    )
                                )
                            }

                        </>
                    )
                }

                {
                    concludedBookings.length > 0 && (
                        <>
                            <h2 className="m-3 mt-6 text-xs font-bold uppercase text-gray-400">
                                {"Finalizados"}
                            </h2>

                            {
                                concludedBookings.map(
                                    (booking) => (
                                        <BookingItem
                                            booking={JSON.parse(JSON.stringify(booking))}
                                            key={booking.id}
                                        />
                                    )
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Bookings;