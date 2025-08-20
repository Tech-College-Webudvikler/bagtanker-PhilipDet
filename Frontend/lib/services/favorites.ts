"use server";

import { prisma } from "@/lib/prisma";

export const createFavorite = async (userId: number, productId: number) => {
    const result = await prisma.favorite.create({
        data: {
            userId,
            productId,
        },
    });

    if (!result) return null;

    return result;
};

export const deleteFavorite = async (userId: number, productId: number) => {
    const result = await prisma.favorite.deleteMany({
        where: {
            userId,
            productId,
        },
    });

    if (!result) return null;

    return result;
};
