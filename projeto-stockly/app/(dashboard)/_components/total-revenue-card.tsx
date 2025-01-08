import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalRevenue } from "@/app/_data-access/dashboard/get-total-revenue";
import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSign } from "lucide-react";


export const TotalRevenueCard = async () => {
    const totalRevenue = await getTotalRevenue();

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
                {"Receita Total"}
            </SummaryCardTitle>

            <SummaryCardValue>
                {formatCurrency(totalRevenue)}
            </SummaryCardValue>
        </SummaryCard>
    );
};