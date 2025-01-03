import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { deleteProduct } from "@/app/_actions/product/delete-product";
import { toastNotification } from "@/app/_helpers/toast-notification";


interface DeleteProductDialogContentProps {
    productId: string;
};

const DeleteProductDialogContent = (props: DeleteProductDialogContentProps) => {
    const { productId } = props;

    const handleContinueClick = async () => {
        try {
            await deleteProduct(
                { id: productId }
            );

            toastNotification("success", "Produto excluído com sucesso!");
        }
        catch (error) {
            console.error(error);
            toastNotification("error", "Ocorreu um erro ao excluir o produto!");
        }
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {"Você tem certeza?"}
                </AlertDialogTitle>

                <AlertDialogDescription>
                    {"Você está prestes a excluir este produto. Esta ação não pode ser desfeita. Deseja continuar?"}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>
                    {"Cancelar"}
                </AlertDialogCancel>

                <AlertDialogAction onClick={handleContinueClick}>
                    {"Continuar"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default DeleteProductDialogContent;