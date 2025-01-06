import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toastNotification } from "@/app/_helpers/toast-notification";
import { deleteSale } from '../../_actions/sale/delete-sale/index';
import { Button } from "@/app/_components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { Sale } from "@prisma/client";


interface SalesTableDropdownMenuProps {
    sale: Pick<Sale, "id">;
};

const SalesTableDropdownMenu = (props: SalesTableDropdownMenuProps) => {
    const { sale } = props;

    const handleToClipboardClick = () => {
        navigator.clipboard.writeText(sale.id);
        toastNotification("success", "ID copiado para a área de transferência!");
    };

    const { execute } = useAction(
        deleteSale,
        {
            onSuccess: () => {
                toastNotification(
                    "success", "Venda deletada com sucesso!"
                );
            },

            onError: () => {
                toastNotification(
                    "error", "Erro ao deletar venda!"
                );
            },
        }
    );

    const handleConfirmDeleteClick = () => {
        return execute(
            { id: sale.id }
        );
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

                    <DropdownMenuItem className={"gap-1.5"} onClick={handleToClipboardClick}>
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

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {"Você tem certeza?"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {"Você está prestes a excluir esta venda. Esta ação não pode ser desfeita. Deseja continuar?"}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {"Cancelar"}
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleConfirmDeleteClick}>
                        {"Continuar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SalesTableDropdownMenu;