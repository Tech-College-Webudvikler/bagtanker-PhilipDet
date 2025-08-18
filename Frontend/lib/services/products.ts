import { prisma } from "@/lib/prisma";
import { ProductType, ReviewType, ProductIngredientType } from "../types";

export const getProducts = async (id?: number) => {
    if (id) {
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
            reviews: result.reviews.map((review) => ({
                id: review.id,
                title: review.title,
                comment: review.comment,
                numStars: review.numStars,
                createdAt: review.createdAt,
                user: {
                    id: review.user.id,
                    name: review.user.name,
                },
            })),
            productIngredients: result.productIngredients.map((ing) => ({
                amount: ing.amount,
                title: ing.ingredients.title,
                name: ing.units.name,
                abbreviation: ing.units.abbreviation,
                orderNum: ing.orderNum,
            })),
            likes: result._count.favorites,
        };
    } else {
        const result = await prisma.product.findMany({
            include: {
                _count: {
                    select: { favorites: true },
                },
            },
        });

        if (!result) {
            throw new Error("No products found");
        }

        return result.map((product) => ({
            id: product.id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            imageUrl: product.imageUrl,
            likes: product._count.favorites,
        }));
    }
};
