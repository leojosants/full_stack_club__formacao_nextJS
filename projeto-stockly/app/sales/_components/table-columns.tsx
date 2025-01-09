"use client";
import { ProductDTO } from "@/app/_data-access/product/get-products";
import { SalesTableDropdownMenu } from "./table-dropdown-menu";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { SaleDTO } from "@/app/_data-access/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";


interface SaleTableColumns extends SaleDTO {
    productOptions: ComboboxOption[];
    products: ProductDTO[];
};

export const saleTableColumns: ColumnDef<SaleTableColumns>[] = [
    {
        accessorKey: "productNames",
        header: "Produtos",
    },

    {
        accessorKey: "totalProducts",
        header: "Quantidade de Produtos",
    },

    {
        header: "Valor Total",
        cell: ({ row: { original: { totalAmount } } }) => {
            return formatCurrency(totalAmount);
        },
    },

    {
        header: "Data",
        cell: ({ row: { original: { date } } }) => {
            return new Date(date).toLocaleDateString("pt-BR");
        },
    },

    {
        header: "Ações",
        cell: ({ row: { original: sale } }) => {
            return (
                <SalesTableDropdownMenu sale={sale} products={sale.products} productOptions={sale.productOptions} />
            );
        },
    },
];