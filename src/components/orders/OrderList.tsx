import { Order } from "@/types";
import { OrderCard } from "./OrderCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface OrderListProps {
    orders: Order[];
    isLoading: boolean;
    onRefresh?: () => void;
}

export function OrderList({ orders, isLoading, onRefresh }: OrderListProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    You haven&apos;t placed any orders yet. Start exploring our delicious meals!
                </p>
                <Link href="/meals">
                    <Button>Browse Meals</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onRefresh={onRefresh} />
            ))}
        </div>
    );
}
