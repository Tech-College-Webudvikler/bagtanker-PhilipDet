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
        <nav className="fixed inset-0 bg-dark-grey flex flex-col items-center py-14 pl-20 pr-11">
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
                    <Link className="navigation-text" href="/">
                        Forside
                    </Link>
                </li>
                <li>
                    <Link className="navigation-text" href="/products">
                        Produkter
                    </Link>
                </li>
                <li>
                    <Link className="navigation-text" href="/news">
                        Nyheder
                    </Link>
                </li>
                <li>
                    <Link className="navigation-text" href="/contact">
                        Kontakt
                    </Link>
                </li>
                <li>
                    {user ? (
                        <Link className="navigation-text" href="/dashboard">
                            Profil
                        </Link>
                    ) : (
                        <Link className="navigation-text" href="/login">
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};
