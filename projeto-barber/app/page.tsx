import { Header } from "./_components/header";
import { Main } from "./_components/Main";

import { db } from "./_lib/prisma";


const Home = async () => {
    const barbershops = await db.barbershop.findMany({});

    const popularBarbershops = await db.barbershop.findMany(
        {
            orderBy: { name: "desc" },
        }
    );

    return (
        <div>
            <Header />

            <Main
                popularBarbershops={popularBarbershops}
                barbershops={barbershops}
            />
        </div>
    );
};

export default Home;