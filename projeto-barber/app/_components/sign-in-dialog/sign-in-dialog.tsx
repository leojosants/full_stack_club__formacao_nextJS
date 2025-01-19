import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

import Image from "next/image";


export const SignInDialog = (): JSX.Element => {
    const handleLoginWithGoogleClick = async (): Promise<void> => {
        await signIn("google");
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {"Faça login na plataforma"}
                </DialogTitle>

                <DialogDescription>
                    {"Conecte-se usando sua conta do Google"}
                </DialogDescription>
            </DialogHeader>

            <Button variant={"outline"} className={"gap-1 font-bold"} onClick={handleLoginWithGoogleClick}>
                <Image
                    alt={"Fazer login com o Google"}
                    src={"/google.svg"}
                    height={18}
                    width={18}
                />

                {"Google"}
            </Button>
        </>
    );
};