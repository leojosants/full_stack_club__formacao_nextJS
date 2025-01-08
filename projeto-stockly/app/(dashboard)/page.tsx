import { Header, HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { MostSoldProductItem } from "./_components/most-sold-product-item";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { TotalProductsCard } from "./_components/total-products-card";
import { SummaryCardSkeleton, } from "./_components/summary-card";
import { TotalInStockCard } from "./_components/total-in-stock-card";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { TodayRevenueCard } from "./_components/today-revenue-card";
import { TotalSalesCard } from "./_components/total-sales-card";
import { RevenueChart } from "./_components/revenue-chart";
import { Suspense } from "react";


const Home = async () => {
    const {
        totalLast14DaysRevenue, mostSoldProducts
    } = await getDashboard();

    return (
        <div className="m-8 flex w-full flex-col space-y-8 rounded-lg">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>
                        {"Visão geral dos dados"}
                    </HeaderSubtitle>

                    <HeaderTitle>
                        {"Dashboard"}
                    </HeaderTitle>
                </HeaderLeft>
            </Header>

            <div className="grid grid-cols-2 gap-6">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalRevenueCard />
                </Suspense>

                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TodayRevenueCard />
                </Suspense>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalSalesCard />
                </Suspense>

                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalInStockCard />
                </Suspense>

                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalProductsCard />
                </Suspense>
            </div>

            <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
                    <p className="font-semibold text-lg text-slate-900">
                        Receita
                    </p>

                    <p className="text-sm text-slate-400">
                        Últimos 14 dias
                    </p>

                    <RevenueChart data={totalLast14DaysRevenue} />
                </div>

                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
                    <p className="font-semibold text-lg text-slate-900 p-6">
                        Produtos mais vendidos
                    </p>

                    <div className="overflow-y-auto space-y-7 px-6 pb-6">
                        {
                            mostSoldProducts.map(
                                (product) => (
                                    <MostSoldProductItem key={product.productId} product={product} />
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;