import { Header, HeaderLeft, HeaderRight, HeaderTitle } from "../_components/header";
import { CreateProductButton } from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";
import { HeaderSubtitle } from '../_components/header';


const ProductsPage = async () => {
    const productsResponse = await fetch(
        "http://localhost:3000/api/products",
        {
            next: {
                revalidate: 60,
                tags: ["get-products"],
            }
        }
    );

    const products = await productsResponse.json();

    return (
        <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>
                        {"Gestão de Produtos"}
                    </HeaderSubtitle>

                    <HeaderTitle>
                        {"Produtos "} ({products.length})
                    </HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                    <CreateProductButton />
                </HeaderRight>
            </Header>

            <DataTable columns={productTableColumns} data={products} />
        </div>
    );
};

export default ProductsPage;