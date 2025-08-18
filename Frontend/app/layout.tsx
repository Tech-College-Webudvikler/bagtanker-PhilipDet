import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/userProvider";
import "./globals.css";

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
                    <UserProvider>{children}</UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
