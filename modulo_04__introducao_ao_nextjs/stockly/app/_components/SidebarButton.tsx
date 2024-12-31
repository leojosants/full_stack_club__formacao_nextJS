"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import Link from "next/link";


interface SidebarButtonProps {
    children: ReactNode;
    href: string;
    text: string;
};

export const SidebarButton = (props: SidebarButtonProps) => {
    const { href, children, text } = props;
    const pathName = usePathname();

    return (
        <Button variant={pathName === href ? "secondary" : "ghost"} className={"justify-start gap-2"} asChild>
            <Link href={href}>
                {children} {text}
            </Link>
        </Button>
    );
};