"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";
import DeleteProductDialogContent from "./delete-dialog-content";
import { toast } from "sonner";


const getStatusLabel = (status: string) => {
    if (status === "IN_STOCK") {
        return "Em estoque";
    }

    return "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Produto",
    },
    {
        accessorKey: "price",
        header: "Valor unitário",
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

            // @ts-expect-error - status is a string
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

            const handleCopyId = () => {
                navigator.clipboard.writeText(product.id);
                toast.success("ID copiado com sucesso!");
            };

            return (
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"}>
                                <MoreHorizontalIcon size={16} />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {"Ações"}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className={"gap-1.5"} onClick={handleCopyId}>
                                <ClipboardCopyIcon size={16} />
                                {"Copiar ID"}
                            </DropdownMenuItem>

                            <DropdownMenuItem className={"gap-1.5"}>
                                <EditIcon size={16} />
                                {"Editar"}
                            </DropdownMenuItem>

                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className={"gap-1.5"}>
                                    <TrashIcon size={16} />
                                    {"Deletar"}
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DeleteProductDialogContent productId={product.id} />
                </AlertDialog>
            );
        },
    },
];