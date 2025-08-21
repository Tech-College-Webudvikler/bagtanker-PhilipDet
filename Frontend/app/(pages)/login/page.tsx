"use client";

import { useUser } from "@/context/userProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validation } from "@/lib/utils";

const Login = () => {
    const { user, loading, fetchUser } = useUser();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!validation("email", email)) {
            setErrorMessage("Udfyld venligst din email korrekt");
            return;
        }

        if (!validation("password", password)) {
            setErrorMessage("Udfyld venligst dit password");
            return;
        }

        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            setSuccessMessage("Login succesfuld!");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                fetchUser();
                router.push("/dashboard");
            }, 2000);
        } else {
            setErrorMessage(responseData.message || "Login fejl");
        }
    };

    useEffect(() => {
        if (user && !loading) {
            router.replace("/dashboard");
        }
    }, [user, loading, router]);

    return (
        <div className="flex flex-col gap-6">
            <h1>Login</h1>
            <p>Indtast og send email og password for at logge ind.</p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full lg:w-1/2 gap-4"
            >
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Indtast din Email"
                    className="primary-input"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Indtast dit Password"
                    className="primary-input"
                />
                {errorMessage && (
                    <span className="text-red-500 font-light text-2xl">
                        {errorMessage}
                    </span>
                )}
                {successMessage && (
                    <span className="text-green-500 font-light text-2xl">
                        {successMessage}
                    </span>
                )}
                <div className="flex justify-between items-center">
                    <Link
                        href="/signup"
                        className="text-blue-500 hover:text-purple-500 font-light text-xl"
                    >
                        Har du ikke en konto? Tilmeld dig
                    </Link>
                    <button type="submit" className="form-button ml-auto">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
