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

export const formatPrice = (price: number) => {
    if (price === null) return "Ukendt pris";

    return (
        new Intl.NumberFormat("da-DK", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price) + " DKK"
    );
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const formatDate = (date: string) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth(); // Months are zero-based
    const day = new Date(date).getDate();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}. ${months[month]} ${year} kl. ${formattedHours}:${formattedMinutes}`;
};
