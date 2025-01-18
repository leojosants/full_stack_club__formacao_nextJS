import { GetBookingsProps } from "./get-bookings-props";
import { endOfDay, startOfDay } from "date-fns";
import { db } from "@/app/_lib/prisma";


export const getBookings = (props: GetBookingsProps) => {
    const { serviceId, date } = props;

    return db.booking.findMany(
        {
            where: {
                date: {
                    lte: endOfDay(date),
                    gte: startOfDay(date),
                },
            },
        }
    );
};