import ProductsList from "./_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";


const ProductsPage = async () => {
    const response = await fetch(
        "http://localhost:3000/api/products", { method: "GET" }
    );

    const products = await response.json();

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

            <ProductsList />

            {/* <DataTable columns={productTableColumns} data={products} /> */}
        </div>
    );
};

export default ProductsPage;