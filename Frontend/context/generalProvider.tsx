"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { GeneralContextType, CategoryType } from "@/lib/types";
import { getCategory } from "@/lib/services/categories";

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const useGeneral = () => {
    const context = useContext(GeneralContext);
    if (!context) {
        throw new Error("useGeneral must be used within a GeneralProvider");
    }
    return context;
};

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<CategoryType | null>(null);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const fetchCategory = async (id: number) => {
        setLoading(true);
        try {
            const result = await getCategory(id);

            if (result) {
                setCategory(result);
            }
        } catch (error) {
            console.error("Failed to fetch category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categoryId) {
            fetchCategory(Number(categoryId));
            setLoading(false);
        } else {
            setCategory(null);
            setLoading(false);
        }
    }, [categoryId]);

    return (
        <GeneralContext.Provider value={{ loading, category, setCategoryId }}>
            {children}
        </GeneralContext.Provider>
    );
};
