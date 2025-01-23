import { ProductPageProps } from "./product-page-props";
import { JSX } from "react";


const ProductPage = async ({ params }: ProductPageProps): Promise<JSX.Element> => {
    const { id } = await params;

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