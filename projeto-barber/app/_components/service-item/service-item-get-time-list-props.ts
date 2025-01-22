import { Booking } from "@prisma/client";


export interface GetTimeListProps {
    bookings: Booking[];
    selectedDay: Date;
};