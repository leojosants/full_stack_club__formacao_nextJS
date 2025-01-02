import { cachedGetProducts } from "@/app/_data-access/product/get-products";


const ProductsList = async () => {
    const products = await cachedGetProducts();

    return (
        <ul>
            {
                products.map(
                    (product) => (
                        <li key={product.id}>
                            {product.name}
                        </li>
                    )
                )
            }
        </ul>
    );
};

export default ProductsList;
