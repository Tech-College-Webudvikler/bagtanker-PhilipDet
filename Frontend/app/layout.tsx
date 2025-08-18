import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/userProvider";
import "./globals.css";
import { LayoutWrapper } from "@/components/layoutWrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <UserProvider>
                        <LayoutWrapper>{children}</LayoutWrapper>
                    </UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
