"use client";

import { JSX } from "react";


const isClient: boolean = typeof window !== "undefined";

const Counter = (): JSX.Element => {
    return (
        <div>
            {isClient ? "Client" : "Server"}
        </div>
    );
};

export default Counter;