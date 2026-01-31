"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { fetcher } from "@/lib/api";
import { OrderList } from "@/components/orders/OrderList";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { PaginationControls } from "@/components/ui/PaginationControls";

export default function OrdersPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({ page: page.toString(), limit: "10" });
            const response = await fetcher<{ data: Order[], meta: any }>(`/orders/my-orders?${query.toString()}`, {
                credentials: "include"
            });
            setOrders(response.data);
            setTotalPages(response.meta.totalPages);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            toast({
                title: "Error",
                description: "Failed to load your orders. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending) {
            if (!session) {
                router.push("/login?redirect=/orders");
            } else {
                const user = session.user as any;
                if (user.role !== "CUSTOMER") {
                    if (user.role === "PROVIDER") {
                        router.push("/provider");
                    } else if (user.role === "ADMIN") {
                        router.push("/admin");
                    } else {
                        router.push("/");
                    }
                }
            }
        }
    }, [isPending, session, router]);

    useEffect(() => {
        if (session?.user) {
            fetchOrders();
        }
    }, [session, page]);

    if (isPending) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">View your past order history.</p>
            </div>

            <OrderList orders={orders} isLoading={isLoading} onRefresh={fetchOrders} />

            {!isLoading && (
                <PaginationControls
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
