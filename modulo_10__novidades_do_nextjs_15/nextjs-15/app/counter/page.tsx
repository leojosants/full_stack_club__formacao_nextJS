import Link from "next/link";

import { JSX } from "react";


export const dynamic = "force-dynamic";

const Counter = async (): Promise<JSX.Element> => {
    const url = "http://localhost:3000/api/counter";

    const response: Response = await fetch(
        url, { method: "GET" }
    );

    const data = await response.json();

    return (
        <div className="p-6 space-y-2">
            <ul>
                <li>
                    <Link href={"/"}>
                        Home page
                    </Link>
                </li>
            </ul>

            <h1>
                {"Counter"}
            </h1>

            <p>
                {data.count}
            </p>
        </div>
    );
};

export default Counter;