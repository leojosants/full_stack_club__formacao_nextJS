import { Header, HeaderLeft, HeaderRight, HeaderTitle } from "../_components/header";
import { CreateProductButton } from "./_components/create-product-button";
import { getProducts } from "../_data-access/product/get-products";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";
import { HeaderSubtitle } from '../_components/header';


const ProductsPage = async () => {
    const products = await getProducts();

    return (
        <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
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