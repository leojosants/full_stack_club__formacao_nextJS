"use client";
import { SaleDTO } from "@/app/_data-access/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";


export const saleTableColumns: ColumnDef<SaleDTO>[] = [
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
                <SalesTableDropdownMenu sale={sale} />
            );
        },
    },
];