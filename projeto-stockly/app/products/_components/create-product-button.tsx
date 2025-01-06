"use client";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";


const CreateProductButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    {"Novo produto"}
                </Button>
            </DialogTrigger>

            <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen} />
        </Dialog>
    );
};

export default CreateProductButton;