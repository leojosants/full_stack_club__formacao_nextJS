import { toastNotification } from "./toast-notification";


export const handleToClipboardClick = (id: string) => {
    navigator.clipboard.writeText(id);
    toastNotification("success", "ID copiado para a área de transferência!");
};