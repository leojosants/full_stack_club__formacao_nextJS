"use client";
import { ProductDTO } from "@/app/_data-access/product/get-products";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";


interface UpsertSaleButtonProps {
    productOptions: ComboboxOption[];
    products: ProductDTO[];
};

export const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button className={"gap-1.5"}>
                    <PlusIcon size={20} />
                    {"Nova venda"}
                </Button>
            </SheetTrigger>

            <UpsertSheetContent isOpen={sheetIsOpen} setSheetIsOpen={setSheetIsOpen} {...props} />
        </Sheet>
    );
};