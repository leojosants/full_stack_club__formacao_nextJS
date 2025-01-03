import CreateProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";


const ProductsPage = async () => {
    const productsResponse = await fetch(
        "http://localhost:3000/api/products",
        {
            next: {
                revalidate: 60,
                tags: ["get-products"],
            }
        }
    );

    const products = await productsResponse.json();

    return (
        <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de Produtos
                    </span>

                    <h2 className="text-xl font-semibold">
                        Produtos ({products.length})
                    </h2>
                </div>

                <CreateProductButton />
            </div>

            <DataTable columns={productTableColumns} data={products} />
        </div>
    );
};

export default ProductsPage;