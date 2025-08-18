import { CategoriesHeader } from "./categoriesHeader";
import { Header } from "./header";
import { ShowIfNotOnRoot } from "./showIfNotOnRoot";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative h-screen">
            <Header />
            <ShowIfNotOnRoot>
                <CategoriesHeader />
            </ShowIfNotOnRoot>
            {children}
        </main>
    );
};
