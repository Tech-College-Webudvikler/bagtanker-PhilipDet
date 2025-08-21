import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/userProvider";
import "./globals.css";
import { ShowContent } from "@/components/showContent";
import { GeneralProvider } from "@/context/generalProvider";

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
                            <ShowContent>{children}</ShowContent>
                        </UserProvider>
                    </GeneralProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
