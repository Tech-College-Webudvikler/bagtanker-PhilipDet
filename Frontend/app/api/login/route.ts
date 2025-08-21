import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/services/auth";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { message: "Udfyld alle felter" },
            { status: 400 }
        );
    }

    try {
        const result = await authenticateUser(email, password);
        if (!result)
            return NextResponse.json(
                { message: "Ugyldig email eller adgangskode" },
                { status: 401 }
            );
        const res = NextResponse.json(result);

        const cookiesOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
        };

        res.cookies.set("accessToken", result.accessToken, {
            ...cookiesOptions,
            maxAge: Number(process.env.TOKEN_ACCESS_EXPIRATION_SECS),
        });

        res.cookies.set("refreshToken", result.refreshToken, {
            ...cookiesOptions,
            maxAge: Number(process.env.TOKEN_REFRESH_EXPIRATION_SECS),
        });

        return res;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
        return NextResponse.json({ message: "An unknown error occurred" });
    }
};
