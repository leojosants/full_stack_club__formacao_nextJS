import { getProducts } from "../_data-access/product/get-products";
import { saleTableColumns } from "./_components/table-columns";
import { ComboboxOption } from "../_components/ui/combobox";
import { getSales } from "../_data-access/sale/get-sale";
import { DataTable } from "../_components/ui/data-table";
import { HeaderSubtitle } from '../_components/header';
import Header, { HeaderLeft, HeaderRight, HeaderTitle } from "../_components/header";
import UpsertSaleButton from "./_components/create-sale-button";


const SalesPage = async () => {
    const sales = await getSales();
    const products = await getProducts();

    const productOptions: ComboboxOption[] = products.map(
        (product) => (
            {
                label: product.name,
                value: product.id,
            }
        )
    );

    const tableData = sales.map(
        (sale) => (
            { ...sale, products, productOptions }
        )
    );

    return (
        <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>
                        {"Gestão de Vendas"}
                    </HeaderSubtitle>
                    <HeaderTitle>
                        {"Vendas"} ({sales.length})
                    </HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                    <UpsertSaleButton products={products} productOptions={productOptions} />
                </HeaderRight>
            </Header>

            <DataTable columns={saleTableColumns} data={tableData} />
        </div>
    );
};

export default SalesPage;