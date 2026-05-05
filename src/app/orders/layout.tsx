"use client";

import { CustomerSidebar } from "@/components/layout/CustomerSidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login?redirect=/orders");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
            <CustomerSidebar />
            <main className="flex-1 p-6 md:p-8 bg-muted/5">
                {children}
            </main>
        </div>
    );
}
