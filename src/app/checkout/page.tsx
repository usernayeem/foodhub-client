"use client";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const { data: session, isPending, error } = authClient.useSession();
    const router = useRouter();
    // Start with a loading state to prevent flash of "Please login"
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (!isPending) {
            setIsCheckingAuth(false);
            if (!session) {
                router.push("/login?redirect=/checkout");
            }
        }
    }, [session, isPending, router]);

    if (isPending || isCheckingAuth) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <CheckoutForm />
                </div>
                <div className="lg:col-span-1">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
