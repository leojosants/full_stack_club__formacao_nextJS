"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";


interface SidebarButtonInterface {
    children: React.ReactNode;
    href: string;
};

const SidebarButton = (props: SidebarButtonInterface) => {
    const { href, children } = props;
    const pathName = usePathname();

    return (
        <Button variant={pathName === href ? "secondary" : "ghost"} className="justify-start gap-1.5" asChild>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};

export default SidebarButton; 