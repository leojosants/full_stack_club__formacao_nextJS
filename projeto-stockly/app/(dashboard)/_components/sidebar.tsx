"use client";
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "@/app/_components/sidebarButton";


interface SidebarEndpointsInterface {
    products: string;
    sales: string;
    home: string;
};

const sidebarEndpoints: SidebarEndpointsInterface = {
    products: "/products",
    sales: "/sales",
    home: "/",
};

export default function Sidebar() {
    return (
        <div className="w-64 bg-white">
            <div className="px-8 py-6">
                <h1 className="uppercase font-bold text-2xl">
                    stockly
                </h1>
            </div>

            <div className="flex flex-col gap-2 p-2">
                <SidebarButton href={sidebarEndpoints.home}>
                    <LayoutGridIcon size={20} />
                    Dashboard
                </SidebarButton>

                <SidebarButton href={sidebarEndpoints.products}>
                    <PackageIcon size={20} />
                    Produtos
                </SidebarButton>

                <SidebarButton href={sidebarEndpoints.sales}>
                    <ShoppingBasketIcon size={20} />
                    Vendas
                </SidebarButton>
            </div>
        </div>
    );
};