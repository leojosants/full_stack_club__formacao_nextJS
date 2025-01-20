"use server";

import { createBookingRevalidatePath } from "./create-booking-revalidate-path";
import { CreateBookingParams } from "./create-booking-params";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const createBooking = async (params: CreateBookingParams): Promise<void> => {
    const user = await getServerSession(authOptions);

    if (!user) {
        throw new Error("Usuário não autenticado!");
    }

    await db.booking.create(
        {
            data: { ...params, userId: (user.user as any).id },
        }
    );

    revalidatePath(createBookingRevalidatePath.barbershopsId);
};