import Link from "next/link";


const Home = () => {
    return (
        <div className="p-6 space-y-2">
            <ul>
                <li>
                    <Link href={"/counter"}>
                        {"Counter page"}
                    </Link>
                </li>
            </ul>

            <h1 className="font-bold text-2xl">
                {"Home"}
            </h1>
        </div>
    );
};

export default Home;
