import { MostSoldProductDTO } from "@/app/_data-access/dashboard/get-most-sold-products";
import { ProductStatusBadge } from "@/app/_components/product-status-badge";
import { formatCurrency } from "@/app/_helpers/currency";


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

                <p className="font-medium text-slate-500">
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

export const MostSoldProductItemSkeleton = () => {
    return (
        <div className="flex items-center justify-between pt-5">
            <div className="space-y-2">
                <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
                <div className="h-6 w-[91.23px] rounded-md bg-gray-200" />
                <div className="h-6 w-[105px] rounded-md bg-gray-200" />
            </div>

            <div>
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
            </div>
        </div>
    );
};