import { GetTimeListProps } from "./service-item-get-time-list-props";

import { TIME_LIST } from "./service-item-time-list";

import { isPast, isToday, set } from "date-fns";


export const getTimeList = (props: GetTimeListProps) => {
    const { bookings, selectedDay } = props;

    return TIME_LIST.filter(
        (time) => {
            const hour = Number(
                time.split(":")[0]
            );

            const minutes = Number(
                time.split(":")[1]
            );

            const timeIsOnThePast = isPast(
                set(
                    new Date(), { hours: hour, minutes: minutes }
                )
            );

            if (timeIsOnThePast && isToday(selectedDay)) {
                return false;
            }

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