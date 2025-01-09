import { toastNotification } from "./toast-notification";


export const handleToClipboardClick = (productId: string) => {
    navigator.clipboard.writeText(productId);
    toastNotification("success", "ID copiado com sucesso!");
};