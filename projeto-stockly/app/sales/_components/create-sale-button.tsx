"use client";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";


interface UpsertSaleButtonProps {
    productOptions: ComboboxOption[];
    products: Product[];
};

export const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
    const { products, productOptions } = props;

    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button className={"gap-1.5"}>
                    <PlusIcon size={20} />
                    {"Nova venda"}
                </Button>
            </SheetTrigger>

            <UpsertSheetContent products={products} productOptions={productOptions} setSheetIsOpen={setSheetIsOpen} />
        </Sheet>
    );
};