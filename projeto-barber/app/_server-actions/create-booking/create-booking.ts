"use server";

import { CreateBookingParams } from "./create-booking-params";

import { db } from "@/app/_lib/prisma";


export const createBooking = async (params: CreateBookingParams) => {
    await db.booking.create(
        { data: params }
    );
};