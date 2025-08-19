import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "./auth";

export const getUsers = async (id?: number) => {
    if (id) {
        const result = await prisma.user.findUnique({
            where: { id },
            include: {
                favorites: true,
            },
        });

        if (!result) return null;

        return {
            id: result.id,
            name: result.name,
            email: result.email,
            description: result.description,
            favorites: result.favorites.map((fav) => fav.productId),
        };
    } else {
        const result = await prisma.user.findMany();

        if (!result) return null;

        return result.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
        }));
    }
};

export const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) return null;

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                refreshToken: "",
                image: "no-image.png",
            },
        });

        const accessToken = generateToken(newUser, "access");
        const refreshToken = generateToken(newUser, "refresh");

        await prisma.user.update({
            where: { id: newUser.id },
            data: {
                refreshToken: refreshToken,
            },
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            error: "Failed to create user",
        };
    }
};
