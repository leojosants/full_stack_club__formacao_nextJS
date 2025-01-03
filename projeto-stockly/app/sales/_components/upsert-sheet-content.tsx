"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { z } from "zod";


const formSchema = z.object(
    {
        productId: z.string()
            .uuid(
                { message: "O produto é obrigatório." }
            ),

        quantity: z.coerce.number().int().positive(),
    }
);

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
    productOptions: ComboboxOption[];
    products: Product[];
};

interface SelectedProductsInterface {
    quantity: number;
    price: number;
    name: string;
    id: string;
};

const UpsertSheetContent = (props: UpsertSheetContentProps) => {
    const { products, productOptions } = props;
    const [selectedProducts, setSelectedProducts] = useState<SelectedProductsInterface[]>([]);

    const form = useForm<FormSchema>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                productId: "",
                quantity: 1,
            },
        }
    );

    const onSubmit = (data: FormSchema) => {
        const selectedProduct = products.find(
            (product) => product.id === data.productId
        );

        if (!selectedProduct) return;

        setSelectedProducts(
            (currencyProducts) => {
                const existingProduct = currencyProducts.find(
                    (product) => product.id === selectedProduct.id
                );

                if (existingProduct) {
                    return currencyProducts.map(
                        (product) => {
                            if (product.id === selectedProduct.id) {
                                return { ...product, quantity: product.quantity + data.quantity };
                            }

                            return product;
                        }
                    );
                }

                return [
                    ...currencyProducts,
                    { ...selectedProduct, price: Number(selectedProduct.price), quantity: data.quantity }
                ];
            }
        );

        form.reset();
    };

    const productsTotal = useMemo(
        () => {
            return selectedProducts.reduce(
                (acc, product) => {
                    return acc + product.price * product.quantity
                }, 0
            );
        }, [selectedProducts]
    );

    return (
        <SheetContent className={"!max-w-[43.75rem]"}>
            <SheetHeader>
                <SheetTitle>
                    {"Nova venda"}
                </SheetTitle>

                <SheetDescription>
                    {"Insira as informações da venda abaixo."}
                </SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
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

                    <Button type={"submit"} className={"w-full gap-2"} variant={"secondary"}>
                        <PlusIcon size={20} />
                        {"Adicionar produto à venda"}
                    </Button>
                </form>
            </Form>

            <Table>
                <TableCaption>
                    {"Lista dos produtos adicionados à venda."}
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {"Produto"}
                        </TableHead>

                        <TableHead>
                            {"Preço Unitário"}
                        </TableHead>

                        <TableHead>
                            {"Quantidade"}
                        </TableHead>

                        <TableHead>
                            {"Total"}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        selectedProducts.map(
                            (product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {product.name}
                                    </TableCell>

                                    <TableCell>
                                        {formatCurrency(product.price)}
                                    </TableCell>

                                    <TableCell>
                                        {product.quantity}
                                    </TableCell>

                                    <TableCell>
                                        {formatCurrency(product.price * product.quantity)}
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    }
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            {"Total"}
                        </TableCell>

                        <TableCell>
                            {formatCurrency(productsTotal)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </SheetContent>
    );
};

export default UpsertSheetContent;