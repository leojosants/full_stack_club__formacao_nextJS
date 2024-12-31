import { getProducts } from "../_data-access/product/get-products";
import { productsTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";


const Products = async () => {
    const products = await getProducts();

    return (
        <div className="mx-8 w-full space-y-8 rounded-lg bg-white p-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de Produtos
                    </span>

                    <h2 className="text-xl font-semibold">
                        Produtos
                    </h2>
                </div>

                <Button className="gap-2">
                    <PlusIcon size={20} /> {"Novo produto"}
                </Button>
            </div>

            <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))} />
        </div>
    );
};

export default Products;