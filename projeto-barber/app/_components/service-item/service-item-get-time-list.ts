import { TIME_LIST } from "./service-item-time-list";

import { Booking } from "@prisma/client";


export const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter(
        (time) => {
            const hour = Number(
                time.split(":")[0]
            );

            const minutes = Number(
                time.split(":")[1]
            );

            const hasBookingOnCurrentTime = bookings.some(
                (booking) =>
                    booking.date.getHours() === hour &&
                    booking.date.getMinutes() === minutes
            );

            if (hasBookingOnCurrentTime) {
                return false;
            }

            return true;
        }
    );
};