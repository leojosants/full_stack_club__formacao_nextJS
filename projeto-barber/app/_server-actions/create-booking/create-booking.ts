"use server";

import { createBookingRevalidatePath } from "./create-booking-revalidate-path";
import { CreateBookingParams } from "./create-booking-params";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";


export const createBooking = async (params: CreateBookingParams) => {
    await db.booking.create(
        { data: params }
    );

    revalidatePath(createBookingRevalidatePath.barbershopsId);
};