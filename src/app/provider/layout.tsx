import { ProviderSidebar } from "@/components/layout/ProviderSidebar";

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
            <ProviderSidebar />
            <main className="flex-1 p-6 md:p-8">
                {children}
            </main>
        </div>
    );
}
