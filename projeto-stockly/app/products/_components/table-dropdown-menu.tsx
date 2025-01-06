import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { toastNotification } from "@/app/_helpers/toast-notification";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";
import DeleteProductDialogContent from "./delete-dialog-content";


interface ProductTableDropdownMenuProps {
    product: Product;
};

const ProductTableDropdownMenu = (props: ProductTableDropdownMenuProps) => {
    const { product } = props;
    const [editDialogOpen, setEditDialogIsOpen] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText(product.id);
        toastNotification("success", "ID copiado com sucesso!");
    };

    return (
        <AlertDialog>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogIsOpen}>
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

                        <DialogTrigger asChild>
                            <DropdownMenuItem className={"gap-1.5"}>
                                <EditIcon size={16} />
                                {"Editar"}
                            </DropdownMenuItem>
                        </DialogTrigger>

                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className={"gap-1.5"}>
                                <TrashIcon size={16} />
                                {"Deletar"}
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                <UpsertProductDialogContent
                    defaultValues={
                        {
                            id: product.id,
                            name: product.name,
                            price: Number(product.price),
                            stock: product.stock,
                        }
                    }
                    setDialogIsOpen={setEditDialogIsOpen}
                />

                <DeleteProductDialogContent productId={product.id} />
            </Dialog>
        </AlertDialog>
    );
};

export default ProductTableDropdownMenu;