import { MostSoldProductItem, MostSoldProductItemSkeleton } from "./most-sold-product-item";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import { Skeleton } from "@/app/_components/ui/skeleton";


export const MostSoldProducts = async () => {
    const mostSoldProducts = await getMostSoldProducts();

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
            <p className="p-6 text-lg font-semibold text-slate-900">
                {"Produtos mais vendidos"}
            </p>

            {
                mostSoldProducts.length === 0 ? (
                    <p className="text-2xl font-semibold text-slate-900 rounded-xl bg-white pt-0 pl-6">
                        {(mostSoldProducts.length)}
                    </p>
                ) : (
                    <div className="space-y-7 overflow-y-auto px-6 pb-6">
                        {
                            mostSoldProducts.map(
                                (product) => (
                                    <MostSoldProductItem key={product.productId} product={product} />
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export const MostSoldProductsSkeleton = () => {
    return (
        <Skeleton className="bg-white p-6">
            <div className="space-y-2">
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-4 w-48 rounded-md bg-gray-200" />
                <MostSoldProductItemSkeleton />
                <MostSoldProductItemSkeleton />
                <MostSoldProductItemSkeleton />
            </div>
        </Skeleton>
    );
};