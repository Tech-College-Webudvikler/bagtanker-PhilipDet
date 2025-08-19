"use client";

import { getCategories } from "@/lib/services/categories";
import { CategoryType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGeneral } from "@/context/generalProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const CategoriesHeader = () => {
    const { category } = useGeneral();
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const router = useRouter();

    const handleCategoryClick = (cat: CategoryType | null) => {
        if (!cat) {
            router.replace(`/products`);
            return;
        }
        router.replace(`/products?category=${cat?.id}`);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            await getCategories()
                .then((data) => {
                    if (!data) return;
                    setCategories(data);
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchCategories();
    }, []);

    return (
        <ul className="w-full flex justify-start bg-dark-grey lg:justify-center overflow-scroll remove-scroll">
            {loading ? (
                <li className="block p-5 text-2xl uppercase text-background font-Hebrew">
                    Henter Kategorier...
                </li>
            ) : (
                <>
                    <li>
                        <button
                            onClick={() => handleCategoryClick(null)}
                            className={cn(
                                "block p-5 text-2xl uppercase text-background font-Hebrew hover:text-baked-yellow transition-colors duration-200 cursor-pointer tracking-[0]",
                                { "text-baked-yellow": !category?.id }
                            )}
                        >
                            Alle
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => handleCategoryClick(cat)}
                                className={cn(
                                    "block p-5 text-2xl uppercase text-background font-Hebrew hover:text-baked-yellow transition-colors duration-200 cursor-pointer tracking-[0]",
                                    {
                                        "text-baked-yellow":
                                            cat.id === category?.id,
                                    }
                                )}
                            >
                                {cat.title}
                            </button>
                        </li>
                    ))}
                </>
            )}
        </ul>
    );
};
