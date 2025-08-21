"use client";

import { useUser } from "@/context/userProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { user, logout, loading } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    useEffect(() => {
        if (!user && !loading) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
};

export default Dashboard;
