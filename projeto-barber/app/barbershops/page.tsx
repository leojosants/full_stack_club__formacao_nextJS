import { BarbershopItem } from "../_components/barbershop-item/barbershop-item";
import { Header } from "../_components/header/header";
import { Search } from "../_components/search/search";

import { BarbershopsPageProps } from "./barbershops-page-props";

import { db } from "../_lib/prisma";


const BarbershopsPage = async (props: BarbershopsPageProps) => {
    const { searchParams } = props;

    const barbershops = await db.barbershop.findMany(
        {
            where: {
                OR: [
                    searchParams?.title
                        ? {
                            name: {
                                contains: searchParams?.title,
                                mode: "insensitive",
                            },
                        }
                        : {},

                    searchParams.service
                        ? {
                            services: {
                                some: {
                                    name: {
                                        contains: searchParams.service,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        }
                        : {},
                ],
            },
        }
    );

    return (
        <div>
            <Header />

            <div className="my-6 px-5">
                <Search placeholder={"Faça sua busca"} />
            </div>

            <div className="px-5">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {"Resultados para '"}{searchParams?.title || searchParams?.service}{"'"}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    {
                        barbershops.map(
                            (barbershop) => (
                                <BarbershopItem
                                    barbershop={barbershop}
                                    key={barbershop.id}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BarbershopsPage;