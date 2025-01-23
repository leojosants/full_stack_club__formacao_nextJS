import { JSX } from "react";


const Counter = (): JSX.Element => {
    return (
        <div>
            {`Random: ${Math.random()}`}
        </div>
    );
};

export default Counter;