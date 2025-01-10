import { Card, CardContent } from "./ui/card";


export const Footer = () => {
    return (
        <Card>
            <CardContent className={"px-6 py-5"}>
                <p className="text-sm text-gray-400">
                    &copy; {"2025 Copyright"} <span className="font-bold">{"FSW Barber"}</span>
                </p>
            </CardContent>
        </Card>
    );
};