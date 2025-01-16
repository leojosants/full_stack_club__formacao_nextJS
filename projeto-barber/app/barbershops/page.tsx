import { BarbershoptItem } from "../_components/barbershopt-item";

import { db } from "../_lib/prisma";


interface BarbershopsPageProps {
    searchParams: {
        search?: string;
    },
};

const BarbershopsPage = async (props: BarbershopsPageProps) => {
    const { searchParams } = props;

    const barbershops = await db.barbershop.findMany(
        {
            where: {
                name: {
                    contains: searchParams?.search,
                    mode: "insensitive",
                },
            },
        }
    );

    return (
        <div>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                {"Resultados para '"}{searchParams.search}{"'"}
            </h2>

            <div className="grid grid-cols-2">
                {
                    barbershops.map(
                        (barbershop) => (
                            <BarbershoptItem
                                barbershop={barbershop}
                                key={barbershop.id}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default BarbershopsPage;