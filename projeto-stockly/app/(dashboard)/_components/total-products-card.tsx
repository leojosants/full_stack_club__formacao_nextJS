import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";
import { ShoppingBasketIcon } from "lucide-react";


export const TotalProductsCard = async () => {
    await new Promise(
        (resolve) => setTimeout(resolve, 2000)
    );

    const totalProducts = await getTotalProducts();

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <ShoppingBasketIcon />
            </SummaryCardIcon>

            <SummaryCardTitle>
                {"Produtos"}
            </SummaryCardTitle>

            <SummaryCardValue>
                {totalProducts}
            </SummaryCardValue>
        </SummaryCard>
    );
};