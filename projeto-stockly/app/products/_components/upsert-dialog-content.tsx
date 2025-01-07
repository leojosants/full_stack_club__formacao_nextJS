"use client";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { upsertProductSchema, UpsertProductSchema } from "@/app/_actions/product/upsert-product/schema";
import { upsertProduct } from "@/app/_actions/product/upsert-product";
import { toastNotification } from "@/app/_helpers/toast-notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { NumericFormat } from "react-number-format";
import { Input } from "@/app/_components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";


interface UpsertProductDialogContentProps {
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
    defaultValues?: UpsertProductSchema;
};

export const UpsertProductDialogContent = (props: UpsertProductDialogContentProps) => {
    const { setDialogIsOpen, defaultValues } = props;

    const { execute: executeUpsertProduct } = useAction(
        upsertProduct,
        {
            onSuccess: () => {
                toastNotification("success", "Produto salvo com sucesso!");
                setDialogIsOpen(false);
            },

            onError: () => {
                toastNotification("error", "Ocorreu um erro ao criar produto!")
            },
        }
    );

    const form = useForm<UpsertProductSchema>(
        {
            resolver: zodResolver(upsertProductSchema),
            shouldUnregister: true,
            defaultValues: defaultValues ?? {
                name: "",
                price: 0,
                stock: 1,
            },
        }
    );

    const onsubmit = async (data: UpsertProductSchema) => {
        executeUpsertProduct(
            { ...data, id: defaultValues?.id }
        );
    };

    const isEditing = !!defaultValues;

    return (
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? "Editar" : "Criar"}  {"produto"}
                        </DialogTitle>

                        <DialogDescription>
                            {"Insira as informações abaixo"}
                        </DialogDescription>
                    </DialogHeader>

                    <FormField control={form.control} name={"name"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {"Nome"}
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
                                    {"Preço"}
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
                                    {"Estoque"}
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
                                {"Cancelar"}
                            </Button>
                        </DialogClose>

                        <Button type={"submit"} disabled={form.formState.isSubmitting} className={"gap-1.5"}>
                            {
                                form.formState.isSubmitting ? (
                                    <>
                                        <Loader2Icon className={"animate-spin"} size={16} />
                                        <span>
                                            {"aguarde"}
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        {"Salvar"}
                                    </span>
                                )
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};