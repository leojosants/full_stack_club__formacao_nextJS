"use client";

import { ProductPageProps } from "./product-page-props";

import { JSX, use } from "react";


const ProductPage = ({ params }: ProductPageProps): JSX.Element => {
    const { id } = use(params);

    return (
        <div>
            <h1>
                {"Products Page"}
            </h1>

            <p>
                {`Product ID: ${id}`}
            </p>
        </div>
    );
};

export default ProductPage;