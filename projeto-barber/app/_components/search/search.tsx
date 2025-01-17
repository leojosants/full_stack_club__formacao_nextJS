"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from '@hookform/resolvers/zod';

import { formSearch, SearchSchema } from "./schema";
import { SearchProps } from './search-props';

import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";

import { useForm } from "react-hook-form";


export const Search = (props: SearchProps) => {
    const { placeholder } = props;
    const router = useRouter();

    const form = useForm<SearchSchema>(
        {
            resolver: zodResolver(formSearch),
            defaultValues: {
                search: "",
            },
        }
    );

    const handleSubmit = (data: SearchSchema) => {
        router.push(`/barbershops?search=${data.search}`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="search"
                    render={
                        ({ field }) => (
                            <FormItem className={"w-full"}>
                                <FormControl>
                                    <Input
                                        placeholder={placeholder}
                                        className={"w-full"}
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )
                    }
                />

                <Button type={"submit"}>
                    <SearchIcon />
                </Button>
            </form>
        </Form>
    );
};