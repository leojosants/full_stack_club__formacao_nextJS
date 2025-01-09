import { MostSoldProductDTO } from "@/app/_data-access/dashboard/get-most-sold-products";
import { ProductStatusBadge } from "@/app/_components/product-status-badge";
import { formatCurrency } from "@/app/_helpers/currency";
import { Skeleton } from "@/app/_components/ui/skeleton";


interface MostSoldProductItemProps {
    product: MostSoldProductDTO;
};

export const MostSoldProductItem = (props: MostSoldProductItemProps) => {
    const { product } = props;

    return (
        <div className="flex items-center justify-between">
            <div className="space-y-[6px]">
                <ProductStatusBadge status={product.status} />

                <p className="font-semibold">
                    {product.name}
                </p>

                <p className="text-slate-500 font-medium">
                    {formatCurrency(Number(product.price))}
                </p>
            </div>

            <div>
                <p className="text-sm font-semibold">
                    {product.totalSold} {"vendido(s)"}
                </p>
            </div>
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

export const MostSoldProductItemSkeleton = () => {
    return (
        <div className="pt-5 flex justify-between items-center">
            <div className="space-y-2">
                <div className="h-[22px] w-[91.23px] bg-gray-200 rounded-md" />
                <div className="h-6 w-[91.23px] bg-gray-200 rounded-md" />
                <div className="h-6 w-[105px] bg-gray-200 rounded-md" />
            </div>

            <div>
                <div className="h-5 w-[86.26px] bg-gray-200 rounded-md" />
            </div>
        </div>
    );
};