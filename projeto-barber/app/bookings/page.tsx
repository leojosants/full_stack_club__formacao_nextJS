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

    const bookings = await db.booking.findMany(
        {
            where: { userId: (session.user as any).id },
            include: {
                service: {
                    include: { barbershop: true },
                },
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
                    bookings.map(
                        (booking) => (
                            <BookingItem
                                key={booking.id} booking={booking}
                            />
                        )
                    )
                }
            </div>
        </>
    );
};

export default Bookings;