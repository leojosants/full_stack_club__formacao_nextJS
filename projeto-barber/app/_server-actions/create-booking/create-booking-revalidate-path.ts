interface CreateBookingRevalidatePath {
    barbershopsId: string;
    bookings: string;
};

export const createBookingRevalidatePath: CreateBookingRevalidatePath = {
    barbershopsId: "/barbershops/[id]",
    bookings: "/bookings",
};
