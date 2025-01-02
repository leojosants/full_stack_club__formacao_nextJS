const ProductsList = async () => {
    const response = await fetch(
        "http://localhost:3000/api/products", { method: "GET" }
    );

    const products = await response.json();

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
