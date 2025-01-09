import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import { MostSoldProductItem } from "./most-sold-product-item";


export const MostSoldProducts = async () => {
    const mostSoldProducts = await getMostSoldProducts();

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
            <p className="font-semibold text-lg text-slate-900 p-6">
                Produtos mais vendidos
            </p>

            <div className="overflow-y-auto space-y-7 px-6 pb-6">
                {
                    mostSoldProducts.map(
                        (product) => (
                            <MostSoldProductItem key={product.productId} product={product} />
                        )
                    )
                }
            </div>
        </div>
    );
};