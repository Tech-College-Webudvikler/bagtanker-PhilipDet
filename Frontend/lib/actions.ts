"use server";

import { createFavorite, deleteFavorite } from "./services/favorites";

export const createFavoriteAction = async (
    userId: number,
    productId: number
) => {
    const result = await createFavorite(userId, productId);

    if (!result) return null;

    return result;
};

export const deleteFavoriteAction = async (
    userId: number,
    productId: number
) => {
    const result = await deleteFavorite(userId, productId);

    if (!result) return null;

    return result;
};
