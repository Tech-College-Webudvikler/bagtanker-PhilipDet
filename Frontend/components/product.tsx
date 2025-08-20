"use client";

import { ProductType } from "@/lib/types";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useUser } from "@/context/userProvider";
import { createFavorite, deleteFavorite } from "@/lib/services/favorites";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductItem = ({ product }: { product: ProductType }) => {
    const { user } = useUser();
    const [likes, setLikes] = useState(product.likes || 0);
    const [alreadyFavorited, setAlreadyFavorited] = useState(false);

    const handleLike = async () => {
        if (!user) return;

        if (alreadyFavorited) {
            const result = await deleteFavorite(user.id, product.id);
            if (result) {
                setLikes(likes - 1);
                setAlreadyFavorited(false);
            }
        } else {
            const result = await createFavorite(user.id, product.id);
            if (result) {
                setLikes(likes + 1);
                setAlreadyFavorited(true);
            }
        }
    };

    useEffect(() => {
        if (user) {
            setAlreadyFavorited(
                user.favorites?.includes(product.id) ? true : false
            );
        }
    }, [user, product.id]);

    return (
        <div className="flex gap-9 w-full">
            <Image
                className="rounded-md max-w-[269px] max-h-[247px] min-w-[269px] min-h-[247px] w-full h-full object-cover"
                src={`/assets${product.imageUrl}`}
                alt={product.title}
                width={269}
                height={247}
            />
            <div className="w-full flex flex-col gap-3">
                <h2 className="break-words break-all">{product.title}</h2>
                <p>{product.description}</p>
                <ul className="flex justify-between items-center mt-auto">
                    <li>
                        <Link
                            href={`/products/${product.id}`}
                            className="block py-2 px-4 bg-baked-yellow text-[20px] text-background rounded-md hover:bg-blue-grey transition-colors duration-200"
                        >
                            Læs mere
                        </Link>
                    </li>
                    <li className="font-light text-[16px] text-dark-grey flex items-center gap-2">
                        <span>{likes}</span>
                        <button
                            onClick={() => handleLike()}
                            className="cursor-pointer"
                        >
                            <Heart
                                className={cn("heart-grey", {
                                    active: alreadyFavorited,
                                })}
                            />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
