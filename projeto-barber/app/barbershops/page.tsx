import { BarbershopItem } from "../_components/barbershop-item/barbershop-item";
import { Header } from "../_components/header/header";
import { Search } from "../_components/search/search";

import { BarbershopsPageProps } from "./barbershops-page-props";

import { getBarbershops } from "../data-access/get-barbershops";


const BarbershopsPage = async (props: BarbershopsPageProps): Promise<JSX.Element> => {
    const { searchParams } = props;

    const barbershops = await getBarbershops(searchParams);

    return (
        <div>
            <Header />

            <div className="my-6 px-5">
                <Search placeholder={"Faça sua busca..."} />
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