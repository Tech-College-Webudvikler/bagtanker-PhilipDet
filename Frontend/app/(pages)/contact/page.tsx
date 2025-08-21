"use client";

import { validation } from "@/lib/utils";
import { useState } from "react";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!validation("name", name)) {
            setErrorMessage("Udfyld venligst dit navn");
            return;
        }

        if (!validation("email", email)) {
            setErrorMessage("Udfyld venligst din email korrekt");
            return;
        }

        if (!validation("message", message)) {
            setErrorMessage("Udfyld venligst din besked");
            return;
        }

        setSuccessMessage("Formularen blev sendt afsted!");

        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");

            setName("");
            setEmail("");
            setMessage("");
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <h1>Kontakt</h1>

            <div className="grid grid-cols-2 gap-16">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <p>
                        Udfyld og send formularen og vi vil hurtist muligt
                        besvare dine spørgsmål.
                    </p>
                    <input
                        className="primary-input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Indtast dit navn"
                    />
                    <input
                        className="primary-input"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Indtast din email"
                    />
                    <textarea
                        className="primary-input flex-1 resize-none"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Indtast din besked"
                    ></textarea>
                    <ul className="flex justify-between">
                        <li>
                            {errorMessage && (
                                <p className="text-red-500">{errorMessage}</p>
                            )}
                            {successMessage && (
                                <p className="text-green-500">
                                    {successMessage}
                                </p>
                            )}
                        </li>
                        <li>
                            <button
                                className="form-button ml-auto"
                                type="submit"
                            >
                                Send
                            </button>
                        </li>
                    </ul>
                </form>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.4187262442438!2d9.964882513282227!3d57.047926091389876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e1!3m2!1sda!2sdk!4v1755763836048!5m2!1sda!2sdk"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
