import { ProductStatusDTO } from '../_data-access/product/get-products';
import { Badge } from "./ui/badge";


const getStatusLabel = (status: string) => {
    if (status === "IN_STOCK") {
        return "Em estoque";
    }

    return "Fora de estoque";
};

interface ProductStatusBadgeProps {
    status: ProductStatusDTO;
};

export const ProductStatusBadge = (props: ProductStatusBadgeProps) => {
    const { status } = props;
    const label = getStatusLabel(status);

    return (
        <Badge variant={label === "Em estoque" ? "default" : "outline"} className={"gap-1.5"}>
            {label}
        </Badge>
    );
};