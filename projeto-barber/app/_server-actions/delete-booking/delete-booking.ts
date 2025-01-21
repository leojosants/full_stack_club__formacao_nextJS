"use server";

import { deleteBookingRevalidatePath } from "./delete-booking-revalidate-path";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";


export const deteleBooking = async (bookingId: string) => {
    await db.booking.delete(
        {
            where: {
                id: bookingId,
            },
        }
    );

    revalidatePath(deleteBookingRevalidatePath.bookings);
};