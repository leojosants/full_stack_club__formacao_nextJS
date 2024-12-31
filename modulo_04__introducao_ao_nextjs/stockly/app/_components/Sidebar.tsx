import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import { SidebarButton } from "./SidebarButton";


interface SidebarEndpointsInterface {
    home: string;
    products: string;
    sales: string;

};

const sidebarEndpoints: SidebarEndpointsInterface = {
    products: "/products",
    sales: "/sales",
    home: "/",
};

export const Sidebar = () => {
    return (
        <div className="w-64 bg-white">
            <div className="px-8 py-6">
                <h1 className="uppercase font-bold text-2xl">
                    stockly
                </h1>
            </div>

            <div className="flex flex-col gap-2 p-2">
                <SidebarButton href={sidebarEndpoints.home} text={"Dashboard"}>
                    <LayoutGridIcon size={20} />
                </SidebarButton>

                <SidebarButton href={sidebarEndpoints.products} text={"Produtos"}>
                    <PackageIcon size={20} />
                </SidebarButton>

                <SidebarButton href={sidebarEndpoints.sales} text={"Vendas"}>
                    <ShoppingBasketIcon size={20} />
                </SidebarButton>
            </div>
        </div>
    );
};