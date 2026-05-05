"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { fetcher } from "@/lib/api";
import { OrderList } from "@/components/orders/OrderList";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBag, Heart, Star, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardChart } from "@/components/dashboard/DashboardCharts";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { format } from "date-fns";
import { useCart } from "@/context/CartContext";

export default function OrdersPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ordersCount, setOrdersCount] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);
    const { cartCount } = useCart();

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({ page: page.toString(), limit: "10" });
            const response = await fetcher<{ data: Order[], meta: any }>(`/orders/my-orders?${query.toString()}`, {
                credentials: "include"
            });
            setOrders(response.data);
            setTotalPages(response.meta.totalPages);
            setOrdersCount(response.meta.total);
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
        if (session?.user) {
            fetchOrders();
        }
    }, [session, page]);

    useEffect(() => {
        const fetchReviewsCount = async () => {
            if (!session?.user) return;
            try {
                const response = await fetcher<{ meta: any }>("/reviews/my-reviews?limit=1", {
                    credentials: "include"
                });
                setReviewsCount(response.meta.total);
            } catch (error) {
                console.error("Failed to fetch reviews count:", error);
            }
        };

        fetchReviewsCount();
    }, [session]);

    if (isPending) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    const stats = [
        {
            title: "Total Orders",
            value: ordersCount,
            icon: ShoppingBag,
            description: "Orders placed so far",
        },
        {
            title: "Recent Spending",
            value: `$${orders.reduce((acc, curr) => acc + curr.totalAmount, 0).toFixed(2)}`,
            icon: CreditCard,
            description: "From orders on this page",
        },
        {
            title: "My Reviews",
            value: reviewsCount,
            icon: Star,
            description: "Feedback provided",
            href: "/profile/reviews",
        },
        {
            title: "Favorites",
            value: cartCount,
            icon: Heart,
            description: "Items ready to order",
            href: "/checkout",
        },
    ];

    // Mock spending data
    const spendingData = [
        { name: "Week 1", value: 45 },
        { name: "Week 2", value: 82 },
        { name: "Week 3", value: 34 },
        { name: "Week 4", value: 120 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    My Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back, {session.user.name}! Track your orders and manage your account.
                </p>
            </div>

            <DashboardOverview stats={stats} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="md:col-span-4">
                    <DashboardChart 
                        title="Spending History" 
                        description="Monthly spending on FoodHub"
                        data={spendingData}
                        type="area"
                        dataKey="value"
                    />
                </div>
                <div className="md:col-span-3">
                    <DashboardChart 
                        title="Order Types" 
                        description="Your most ordered categories"
                        data={[
                            { name: "Burgers", value: 40 },
                            { name: "Pizza", value: 30 },
                            { name: "Sushi", value: 20 },
                            { name: "Salads", value: 10 },
                        ]}
                        type="pie"
                        dataKey="value"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <OrderList orders={orders} isLoading={isLoading} onRefresh={fetchOrders} />

                {!isLoading && totalPages > 1 && (
                    <PaginationControls
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
}
