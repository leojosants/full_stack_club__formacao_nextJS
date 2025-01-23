import { after } from "next/server";

import { JSX } from "react";


export const dynamic = "force-dynamic";

const Counter = (): JSX.Element => {
    after(
        async () => {
            await new Promise(
                (resolve) => setTimeout(resolve, 5000)
            );

            console.log("after is running");
        }
    );

    return (
        <div>
            {`Random: ${Math.random()}`}
        </div>
    );
};

export default Counter;