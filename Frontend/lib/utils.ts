import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const validation = (type: string, text: string) => {
    switch (type) {
        case "name":
            return text.length > 0;
        case "email":
            return /\S+@\S+\.\S+/.test(text);
        case "password":
            return text.length >= 6;
        case "message":
            return text.length > 0;
        default:
            return false;
    }
};
