"use client";

import { usePathname } from "next/navigation";
import { LayoutWrapper } from "./layoutWrapper";
import { Header } from "./header";
import { CategoriesHeader } from "./categoriesHeader";
import { Footer } from "./footer";

export const ShowContent = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    if (pathName === "/")
        return (
            <>
                <Header />
                {children}
            </>
        );
    return (
        <>
            <Header background />
            <CategoriesHeader />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
        </>
    );
};
