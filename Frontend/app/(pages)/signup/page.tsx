"use client";

import { useUser } from "@/context/userProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
    const { user, loading } = useUser();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        setErrorMessage("");
        setSuccessMessage("");

        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password, confirmPassword }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            setSuccessMessage("Tilmelding succesfuld!");
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } else {
            setErrorMessage(responseData.message || "Tilmeldings fejl");
        }
    };

    useEffect(() => {
        if (user && !loading) {
            router.replace("/dashboard");
        }
    }, [user, loading, router]);

    return (
        <div className="flex flex-col gap-6">
            <h1>Tilmelding</h1>
            <p className="subtitle">
                Indtast et navn, email og password for at tilmelde dig.
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full lg:w-1/2 gap-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Indtast dit Navn"
                    className="primary-input"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Indtast din Email"
                    className="primary-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Indtast dit Password"
                    className="primary-input"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Bekræft dit Password"
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
                <div className="flex justify-between">
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-purple-500 font-light text-xl"
                    >
                        Har du allerede en konto? Log ind
                    </Link>
                    <button type="submit" className="form-button ml-auto">
                        Tilmeld
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
