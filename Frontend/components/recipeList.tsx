import { ProductIngredientType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useUser } from "@/context/userProvider";
import { useState, useEffect } from "react";
import { createFavorite, deleteFavorite } from "@/lib/services/favorites";

export const RecipeList = ({
    productId,
    durationInMinutes,
    amount,
    items,
    likes,
}: {
    productId: number;
    durationInMinutes: number | null;
    amount: number | null;
    items: ProductIngredientType[];
    likes: number | null;
}) => {
    const { user } = useUser();
    const [recipeLikes, setRecipeLikes] = useState(likes || 0);
    const [alreadyFavorited, setAlreadyFavorited] = useState(false);

    const handleLike = async () => {
        if (!user) return;

        if (alreadyFavorited) {
            const result = await deleteFavorite(user.id, productId);
            if (result) {
                setRecipeLikes(recipeLikes - 1);
                setAlreadyFavorited(false);
            }
        } else {
            const result = await createFavorite(user.id, productId);
            if (result) {
                setRecipeLikes(recipeLikes + 1);
                setAlreadyFavorited(true);
            }
        }
    };

    useEffect(() => {
        if (user) {
            setAlreadyFavorited(
                user.favorites?.includes(productId) ? true : false
            );
        }
    }, [user, productId]);

    const formatDuration = (duration: number | null) => {
        if (duration === null) return "Ukendt varighed";

        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        if (hours === 0) {
            return `${minutes} min`;
        }

        return `${hours} t ${minutes} min`;
    };

    return (
        <div className="rounded-lg overflow-hidden">
            <ul className="bg-blue-grey flex justify-between items-center py-2 px-4">
                <li className="text-2xl font-bold text-white">Opskrift</li>
                <li className="font-light text-[16px] text-white flex items-center gap-2">
                    <span>{likes}</span>
                    <button
                        onClick={() => handleLike()}
                        className="cursor-pointer"
                    >
                        <Heart
                            className={cn("heart-white", {
                                active: alreadyFavorited,
                            })}
                        />
                    </button>
                </li>
            </ul>
            <ul className="bg-light-grey text-lg text-blue-grey font-light">
                <li className="py-2 px-4 bg-[#D7D7D2] border-b border-b-[#B1B1B1]">
                    Varighed: {formatDuration(durationInMinutes)}
                </li>
                <li className="py-2 px-4 bg-[#D7D7D2] border-b border-b-[#B1B1B1]">
                    Antal: {amount}
                </li>

                {items.map((item) => (
                    <li
                        key={item.id}
                        className="py-2 px-4 border-b border-b-[#B1B1B1]"
                    >
                        {item.amount} {item.abbreviation} {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
