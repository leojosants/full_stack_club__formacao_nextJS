"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object(
    {
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
    }
);

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
    productOptions: ComboboxOption[];
};

const UpsertSheetContent = (props: UpsertSheetContentProps) => {
    const { productOptions } = props;

    const form = useForm<FormSchema>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                productId: "",
                quantity: 1,
            },
        }
    );

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    {"Nova venda"}
                </SheetTitle>

                <SheetDescription>
                    {"Insira as informações da venda abaixo."}
                </SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form className="space-y-6 py-6">
                    <FormField
                        control={form.control}
                        name={"productId"}
                        render={
                            ({ field }) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>
                                        {"Produto"}
                                    </FormLabel>

                                    <FormControl>
                                        <Combobox placeholder={"Selecione um produto"} options={productOptions} {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />

                    <FormField
                        control={form.control}
                        name={"quantity"}
                        render={
                            ({ field }) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>
                                        {"Quantidade"}
                                    </FormLabel>

                                    <FormControl>
                                        <Input type={"number"} placeholder={"Digite o produto."} {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />
                </form>
            </Form>
        </SheetContent>
    );
};

export default UpsertSheetContent;