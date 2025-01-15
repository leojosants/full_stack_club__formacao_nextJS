"use client";

import { SmartphoneIcon } from "lucide-react";

import { toastNotification } from "../helpers/toast-notification";

import { Button } from "./ui/button";


interface PhoneItemProps {
    phone: string;
};

export const PhoneItem = (props: PhoneItemProps) => {
    const { phone } = props;

    const handleCpyPhoneClick = (id: string) => {
        navigator.clipboard.writeText(id);
        toastNotification("success", "Telefone copiado para a área de transferência!");
    };

    return (
        <div className="flex justify-between" key={phone}>
            {/* esquerda */}
            <div className="flex items-center gap-2">
                <SmartphoneIcon />

                <p className="text-sm">
                    {phone}
                </p>
            </div>

            {/* direita */}
            <Button variant={"outline"} size={"sm"} onClick={() => handleCpyPhoneClick(phone)}>
                {"Copiar"}
            </Button>
        </div>
    );
};