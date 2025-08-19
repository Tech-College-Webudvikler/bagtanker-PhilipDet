import { NextResponse } from "next/server";

export const POST = async () => {
    const res = NextResponse.json({ message: "Logged out successfully" });

    const cookiesOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    };

    res.cookies.set("accessToken", "", { ...cookiesOptions, maxAge: 0 });
    res.cookies.set("refreshToken", "", { ...cookiesOptions, maxAge: 0 });
    return res;
};
