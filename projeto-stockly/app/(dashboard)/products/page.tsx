import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "@/app/_components/ui/data-table";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { db } from "@/app/_lib/prisma";


export default async function ProductsPage() {
    const products = await db.product.findMany({});

    return (
        <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
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
                    <PlusIcon size={20} />
                    Novo produto
                </Button>
            </div>

            <DataTable columns={productTableColumns} data={products} />
        </div>
    );
};