"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";


export const getConfirmedBookings = async () => {
    const session = await getServerSession(authOptions);
    const currentDate = new Date();

    if (!session?.user) {
        return [];
    }

    return await db.booking.findMany(
        {
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: currentDate,
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
    )
};
