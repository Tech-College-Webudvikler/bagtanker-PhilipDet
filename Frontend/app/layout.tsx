import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/userProvider";
import "./globals.css";
import { Header } from "@/components/header";
import { CategoriesHeader } from "@/components/categoriesHeader";
import { ShowIfNotOnRoot } from "@/components/showIfNotOnRoot";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { GeneralProvider } from "@/context/generalProvider";
import { Footer } from "@/components/footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col items-center">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <GeneralProvider>
                        <UserProvider>
                            <Header />
                            <ShowIfNotOnRoot>
                                <CategoriesHeader />
                            </ShowIfNotOnRoot>
                            <LayoutWrapper>{children}</LayoutWrapper>
                            <Footer />
                        </UserProvider>
                    </GeneralProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
