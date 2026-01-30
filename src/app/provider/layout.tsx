"use client";

import { ProviderSidebar } from "@/components/layout/ProviderSidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if not logged in at all
        if (!isPending && !session) {
            router.push("/");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Role mismatch handling
    if (session && (session.user as any).role !== "PROVIDER") {
        return (
            <div className="flex flex-col h-screen items-center justify-center gap-4 p-4 text-center">
                <div className="bg-destructive/10 p-3 rounded-full">
                    <ShieldAlert className="h-10 w-10 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground max-w-md">
                    You are currently logged in as a <strong>{(session.user as any).role}</strong>.
                    This portal is restricted to <strong>Providers</strong> only.
                </p>
                <Button asChild variant="outline">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
            <ProviderSidebar />
            <main className="flex-1 p-6 md:p-8">
                {children}
            </main>
        </div>
    );
}
