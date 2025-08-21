import { useUser } from "@/context/userProvider";
import Link from "next/link";
import { X } from "lucide-react";

export const Navigation = ({
    setIsMenuOpen,
}: {
    setIsMenuOpen: (isOpen: boolean) => void;
}) => {
    const { user } = useUser();

    return (
        <nav className="z-[999] fixed inset-0 bg-dark-grey flex flex-col items-center py-14 pl-20 pr-11">
            <ul className="w-full flex flex-col gap-7">
                <li className="self-end">
                    <button
                        className="navigation-text cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                </li>
                <li>
                    <Link className="navigation-text" href="/" replace>
                        Forside
                    </Link>
                </li>
                <li>
                    <Link
                        className="navigation-text"
                        href="/products"
                        replace
                        prefetch
                    >
                        Produkter
                    </Link>
                </li>
                <li>
                    <Link className="navigation-text" href="/news" replace>
                        Nyheder
                    </Link>
                </li>
                <li>
                    <Link className="navigation-text" href="/contact" replace>
                        Kontakt
                    </Link>
                </li>
                <li>
                    {user ? (
                        <Link
                            className="navigation-text"
                            href="/dashboard"
                            replace
                        >
                            Profil
                        </Link>
                    ) : (
                        <Link className="navigation-text" href="/login" replace>
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};
