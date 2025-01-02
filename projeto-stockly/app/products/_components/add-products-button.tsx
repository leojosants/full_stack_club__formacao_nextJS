"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { NumericFormat } from "react-number-format";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import { z } from "zod";


type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object(
    {
        name: z.string().trim()
            .min(2, { message: "O nome do produto é obrigatório." }),

        price: z.number()
            .min(0.01, { message: "O preço do produto é obrigatório." }),

        stock: z.coerce.number().int()
            .positive({ message: "A quantidade em estoque deve ser positiva." })
            .min(0, { message: "A quantidade em estoque do produto é obrigatório." }),
    }
);

const AddProductsButton = () => {
    const form = useForm<FormSchema>(
        {
            resolver: zodResolver(formSchema),
            shouldUnregister: true,
            defaultValues: {
                name: "",
                price: 0,
                stock: 1,
            },
        }
    );

    const onsubmit = (data: FormSchema) => {
        console.log({ data });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo produto
                </Button>
            </DialogTrigger>

            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>
                                Criar produto
                            </DialogTitle>

                            <DialogDescription>
                                Insira as informações abaixo
                            </DialogDescription>
                        </DialogHeader>

                        <FormField control={form.control} name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nome
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder={"Digite o nome do produto"} {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField control={form.control} name={"price"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Preço
                                    </FormLabel>

                                    <FormControl>
                                        <NumericFormat
                                            thousandSeparator={"."}
                                            decimalSeparator={","}
                                            fixedDecimalScale decimalScale={2}
                                            prefix={"R$ "}
                                            allowNegative={false}
                                            customInput={Input}
                                            onValueChange={(values) => field.onChange(values.floatValue)}
                                            {...field}
                                            onChange={() => { }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField control={form.control} name={"stock"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Estoque
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            type={"number"} placeholder={"Digite o estoque do produto"} {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"secondary"} type={"submit"}>
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <Button type={"submit"}>
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductsButton;