"use client";

import { usePathname } from "next/navigation";

export const ShowIfNotOnRoot = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathName = usePathname();
    if (pathName === "/") return null;
    return <>{children}</>;
};
