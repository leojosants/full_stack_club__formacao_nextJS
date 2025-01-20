import { BookingItemProps } from "./booking-item-props";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";


export const BookingItem = (props: BookingItemProps) => {
    const { booking } = props;

    return (
        <>
            <Card className={"hover:text-gray-400 transition-all duration-300 ease-in-out"}>
                <CardContent className={"flex justify-between p-0"}>
                    <div className="flex flex-col gap-2 py-5 pl-5">
                        <Badge className={"w-fit"}>
                            {"Confirmado"}
                        </Badge>

                        <h3 className="font-semibold">
                            {booking.service.name}
                        </h3>

                        <div className="flex items-center gap-2">
                            <Avatar className={"h-6 w-6"}>
                                <AvatarImage
                                    src={booking.service.barbershop.imageUrl}
                                />
                            </Avatar>

                            <p className="text-sm">
                                {booking.service.barbershop.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                        <p className="text-sm">
                            {"Agosto"}
                        </p>

                        <p className="text-2xl">
                            {"05"}
                        </p>

                        <p className="text-sm">
                            {"20:00"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};