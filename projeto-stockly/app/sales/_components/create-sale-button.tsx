"use client";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";


interface CreateSaleButtonProps {
    productOptions: ComboboxOption[];
    products: Product[];
};

const CreateSaleButton = (props: CreateSaleButtonProps) => {
    const { products, productOptions } = props;

    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button>
                    {"Nova venda"}
                </Button>
            </SheetTrigger>

            <UpsertSheetContent products={products} productOptions={productOptions} setSheetIsOpen={setSheetIsOpen} />
        </Sheet>
    );
};

export default CreateSaleButton;