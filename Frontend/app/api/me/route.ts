import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/services/user";
import { getUserIdFromToken } from "@/lib/services/auth";

export const GET = async (req: NextRequest) => {
    let token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        token = req.cookies.get("accessToken")?.value;
    }

    if (!token) {
        return NextResponse.json({ authenticated: false });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await getUsers(userId);
    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ user });
};
