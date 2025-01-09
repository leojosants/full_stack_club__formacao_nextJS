import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { handleToClipboardClick } from "@/app/_helpers/handle-to-clipboard-click";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";


interface UpsertSalesTableDropdownMenuProps {
    product: Pick<Product, "id">;
    onDelete: (productId: string) => void;
};

export const UpsertSalesTableDropdownMenu = (props: UpsertSalesTableDropdownMenuProps) => {
    const { product, onDelete } = props;

    return (
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

                <DropdownMenuItem className={"gap-1.5"} onClick={() => handleToClipboardClick(product.id)}>
                    <ClipboardCopyIcon size={16} />
                    {"Copiar ID"}
                </DropdownMenuItem>

                <DropdownMenuItem className={"gap-1.5"} onClick={() => onDelete(product.id)}>
                    <TrashIcon size={16} />
                    {"Deletar"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};