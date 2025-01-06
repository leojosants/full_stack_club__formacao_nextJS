import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toastNotification } from "@/app/_helpers/toast-notification";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";


interface UpsertSalesTableDropdownMenuProps {
    product: Pick<Product, "id">;
    onDelete: (productId: string) => void;
};

const UpsertSalesTableDropdownMenu = (props: UpsertSalesTableDropdownMenuProps) => {
    const { product, onDelete } = props;

    const handleToClipboardClick = () => {
        navigator.clipboard.writeText(product.id);
        toastNotification("success", "ID copiado para a área de transferência!");
    };

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

                <DropdownMenuItem className={"gap-1.5"} onClick={handleToClipboardClick}>
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

export default UpsertSalesTableDropdownMenu;