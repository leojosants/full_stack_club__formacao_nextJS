import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalSales } from "@/app/_data-access/dashboard/get-total-sales";
import { CircleDollarSign } from "lucide-react";


export const TotalSalesCard = async () => {
    await new Promise(
        (resolve) => setTimeout(resolve, 2000)
    );

    const totalSales = await getTotalSales();

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <CircleDollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
                {"Vendas Totais"}
            </SummaryCardTitle>

            <SummaryCardValue>
                {totalSales}
            </SummaryCardValue>
        </SummaryCard>
    );
};