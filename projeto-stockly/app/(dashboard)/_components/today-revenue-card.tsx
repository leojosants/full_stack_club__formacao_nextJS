import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";
import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSign } from "lucide-react";


export const TodayRevenueCard = async () => {
    await new Promise(
        (resolve) => setTimeout(resolve, 2000)
    );

    const todayRevenue = await getTodayRevenue();

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
                {"Receita Hoje"}
            </SummaryCardTitle>

            <SummaryCardValue>
                {formatCurrency(todayRevenue)}
            </SummaryCardValue>
        </SummaryCard>
    );
};