"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "./navigation";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className="w-full bg-center bg-cover py-7 px-11"
                style={{
                    backgroundImage:
                        "url('/assets/images/slides/bread-slidebg-01.jpg')",
                }}
            >
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/">
                            <Image
                                src="/assets/images/Logo.svg"
                                alt="Logo"
                                width={446}
                                height={119}
                            />
                        </Link>
                    </li>
                    <li>
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={32} className="text-foreground" />
                        </button>
                    </li>
                </ul>
            </header>

            {isMenuOpen && <Navigation setIsMenuOpen={setIsMenuOpen} />}
        </>
    );
};
