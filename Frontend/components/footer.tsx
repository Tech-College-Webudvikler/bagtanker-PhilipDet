"use client";

import Image from "next/image";
import React, { useState } from "react";

export const Footer = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage("");
        setSuccessMessage("");

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        function validateEmail() {
            if (typeof email !== "string") {
                setErrorMessage("Ugyldig email.");
                return;
            }

            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                setErrorMessage("Ugyldig email.");
                return;
            }

            return true;
        }

        if (validateEmail()) {
            setSuccessMessage("Du er nu tilmeldt!");

            e.currentTarget.reset();

            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
        }
    };

    return (
        <footer className="w-full flex justify-between bg-dark-grey text-white py-11 px-5 text-lg">
            <ul className="flex flex-col justify-between">
                <li>
                    <Image
                        src="/assets/images/footer-logo.svg"
                        alt="Bagtanker Logo"
                        width={232}
                        height={58}
                    />
                </li>
                <li>
                    Øster Uttrupvej 1 <br /> 9000 Aalborg
                </li>
                <li>
                    Tlf: 12345678 <br /> Email: info@bagtanker.dk
                </li>
            </ul>
            <ul className="text-end flex flex-col gap-3">
                <li>
                    <h2>Tilmeld dig Bagtankers nyhedsbrev</h2>
                </li>
                <li>Få vores nyheder direkte i din indbakke</li>
                <li>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        <input
                            className="primary-input"
                            type="text"
                            name="email"
                            placeholder="Indtast din email"
                        />
                        <ul className="flex justify-between">
                            {errorMessage && (
                                <li className="text-red-500 font-light text-2xl">
                                    {errorMessage}
                                </li>
                            )}
                            {successMessage && (
                                <li className="text-green-500 font-light text-2xl">
                                    {successMessage}
                                </li>
                            )}
                            <li className="ml-auto">
                                <button
                                    className="form-button uppercase"
                                    type="submit"
                                >
                                    Tilmeld
                                </button>
                            </li>
                        </ul>
                    </form>
                </li>
            </ul>
        </footer>
    );
};
