"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/_components/ui/chart";
import { DayTotalRevenueDTO } from "@/app/_data-access/dashboard/get-last-14-days-revenue";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";


const chartConfig = {
    totalRevenue: { label: "Receita" },
} satisfies ChartConfig;

interface RevenueChartProps {
    data: DayTotalRevenueDTO[];
};

export const RevenueChart = (props: RevenueChartProps) => {
    const { data } = props;

    return (
        <ChartContainer config={chartConfig} className={"min-h-0 w-full"} >
            <BarChart data={data} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={"day"} tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey={"totalRevenue"} radius={4} />
            </BarChart>
        </ChartContainer>
    );
};