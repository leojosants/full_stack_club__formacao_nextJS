import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalInStock } from "@/app/_data-access/dashboard/get-total-in-stock";
import { PackageIcon } from "lucide-react";


export const TotalInStockCard = async () => {
    await new Promise(
        (resolve) => setTimeout(resolve, 2000)
    );

    const totalInStock = await getTotalInStock();

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <PackageIcon />
            </SummaryCardIcon>

            <SummaryCardTitle>
                {"Total em Estoque"}
            </SummaryCardTitle>

            <SummaryCardValue>
                {totalInStock}
            </SummaryCardValue>
        </SummaryCard>
    );
};