export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative w-full max-w-7xl p-5 flex-1">{children}</main>
    );
};
