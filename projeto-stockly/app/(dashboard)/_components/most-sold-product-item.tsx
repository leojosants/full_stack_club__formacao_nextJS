import { MostSoldProductDTO } from "../../_data-access/dashboard/get-dashboard";
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