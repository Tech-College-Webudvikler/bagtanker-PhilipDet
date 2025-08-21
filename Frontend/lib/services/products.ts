"use server";

import { prisma } from "@/lib/prisma";

export const getProduct = async (id?: number) => {
    const result = await prisma.product.findUnique({
        where: { id },
        include: {
            reviews: { include: { user: true } },
            productIngredients: {
                include: { ingredients: true, units: true },
                orderBy: { orderNum: "asc" },
            },
            _count: {
                select: { favorites: true },
            },
        },
    });

    if (!result) {
        throw new Error("Product not found");
    }

    return {
        id: result.id,
        title: result.title,
        slug: result.slug,
        description: result.description,
        imageUrl: result.imageUrl,
        procedure: result.procedure,
        durationInMinutes: result.durationInMinutes,
        amount: result.amount,
        price: result.price,
        reviews: result.reviews.map((review) => ({
            id: review.id,
            title: review.title,
            comment: review.comment,
            numStars: review.numStars,
            createdAt: review.createdAt,
            user: {
                id: review.user.id,
                name: review.user.name,
                image: review.user.image,
            },
        })),
        productIngredients: result.productIngredients.map((ing) => ({
            id: ing.id,
            amount: ing.amount,
            title: ing.ingredients.title,
            name: ing.units.name,
            abbreviation: ing.units.abbreviation,
            orderNum: ing.orderNum,
        })),
        likes: result._count.favorites,
    };
};

export const getProducts = async () => {
    const result = await prisma.product.findMany({
        include: {
            categoryProducts: {
                select: {
                    categoryId: true,
                },
            },
            _count: {
                select: { favorites: true },
            },
        },
    });

    if (!result) return null;

    return result.map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        imageUrl: product.imageUrl,
        categories: product.categoryProducts.map((cat) => cat.categoryId),
        likes: product._count.favorites,
    }));
};
