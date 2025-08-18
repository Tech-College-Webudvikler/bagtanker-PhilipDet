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
