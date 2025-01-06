"use client";
import { ProductDTO } from "@/app/_data-access/product/get-products";
import { formatCurrency } from "@/app/_helpers/currency";
import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./table-dropdown-menu";


const getStatusLabel = (status: string) => {
    if (status === "IN_STOCK") {
        return "Em estoque";
    }

    return "Fora de estoque";
};

export const productTableColumns: ColumnDef<ProductDTO>[] = [
    {
        accessorKey: "name",
        header: "Produto",
    },

    {
        accessorKey: "price",
        header: "Valor unitário",
        cell: (row) => {
            const product = row.row.original;
            return formatCurrency(Number(product.price));
        },
    },

    {
        accessorKey: "stock",
        header: "Estoque",
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
            const product = row.row.original;
            const label = getStatusLabel(product.status);

            return (
                <Badge variant={label === "Em estoque" ? "default" : "outline"} className={"gap-1.5"}>
                    <CircleIcon size={14} className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`} />
                    {label}
                </Badge>
            );
        },
    },

    {
        accessorKey: "actions",
        header: "Ações",
        cell: (row) => {
            const product = row.row.original;
            return <ProductTableDropdownMenu product={product} />
        },
    },
];