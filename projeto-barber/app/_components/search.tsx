"use client";

import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useState } from "react";


interface SearchProps {
    placeholder: string;
};

export const Search = (props: SearchProps) => {
    const { placeholder } = props;
    const [search, setSearch] = useState();
    const router = useRouter();

    const handleOnchange = (event) => {
        setSearch(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/barbershops?search=${search}`);
    };

    return (
        <form className="flex items-start gap-2" onSubmit={handleSubmit}>
            <Input
                placeholder={placeholder}
                onChange={handleOnchange}
                value={search}
            />

            <Button type={"submit"}>
                <SearchIcon />
            </Button>
        </form>
    );
};