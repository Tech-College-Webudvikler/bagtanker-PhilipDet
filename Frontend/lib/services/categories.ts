"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
    const result = await prisma.category.findMany();

    if (!result) return null;

    return result.map((category) => ({
        id: category.id,
        title: category.title,
        slug: category.slug,
    }));
};

export const getCategory = async (id: number) => {
    const result = await prisma.category.findUnique({
        where: { id },
    });

    if (!result) return null;

    return {
        id: result.id,
        title: result.title,
        slug: result.slug,
    };
};
