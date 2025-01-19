interface CreateBookingRevalidatePath {
    barbershopsId: string;
};

export const createBookingRevalidatePath: CreateBookingRevalidatePath = {
    barbershopsId: "/barbershops/[id]",
};