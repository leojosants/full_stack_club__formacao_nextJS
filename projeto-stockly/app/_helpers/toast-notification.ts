import { toast } from "sonner";


type TypeNotification = "success" | "error";

export const toastNotification = (type: TypeNotification, message: string) => {
    if (type === "success") {
        return toast.success(message);
    }

    if (type === "error") {
        return toast.error(message);
    }
};