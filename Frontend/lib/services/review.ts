"use server";

import { prisma } from "@/lib/prisma";

export const createReview = async (
    productId: number,
    userId: number,
    comment: string
) => {
    const result = prisma.review.create({
        data: {
            title: "",
            comment,
            numStars: 5,
            productId,
            userId,
        },
    });

    if (!result) return null;

    return result;
};
