"use client";

import { useEffect, useState } from "react";
import { Order, OrderStatus } from "@/types";
import { ProviderService } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, CheckCircle, Clock, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function ProviderOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await ProviderService.getOrders();
            // Sort by newest first
            const sorted = (data.data || []).sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setOrders(sorted);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load orders",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await ProviderService.updateOrderStatus(orderId, newStatus);
            toast({
                title: "Status Updated",
                description: `Order status changed to ${newStatus}`,
            });
            loadOrders();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update status",
                variant: "destructive",
            });
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PLACED: return "bg-blue-500 hover:bg-blue-600";
            case OrderStatus.PREPARING: return "bg-yellow-500 hover:bg-yellow-600";
            case OrderStatus.READY: return "bg-green-500 hover:bg-green-600";
            case OrderStatus.DELIVERED: return "bg-gray-500 hover:bg-gray-600";
            case OrderStatus.CANCELLED: return "bg-red-500 hover:bg-red-600";
            default: return "bg-primary";
        }
    };

    const getNextStatus = (current: OrderStatus): OrderStatus | null => {
        switch (current) {
            case OrderStatus.PLACED: return OrderStatus.PREPARING;
            case OrderStatus.PREPARING: return OrderStatus.READY;
            case OrderStatus.READY: return OrderStatus.DELIVERED;
            default: return null;
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">Manage and track your customer orders.</p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-base uppercase tracking-wider font-semibold">
                                        #{order.id.slice(-6)}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <Badge className={`${getStatusColor(order.status)} text-white border-0`}>
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Order Items</h3>
                                    <ul className="space-y-2">
                                        {order.items.map((item) => (
                                            <li key={item.id} className="flex justify-between text-sm">
                                                <span>
                                                    <span className="font-medium">{item.quantity}x</span> {item.meal?.name || "Unknown Meal"}
                                                </span>
                                                <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold mb-2">Delivery Details</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{order.deliveryAddress}</p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                                        <span className="text-sm font-medium mr-2">Update Status:</span>
                                        {getNextStatus(order.status) && (
                                            <Button
                                                size="sm"
                                                onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                                            >
                                                Mark as {getNextStatus(order.status)}
                                            </Button>
                                        )}
                                        {order.status === OrderStatus.PLACED && (
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleStatusUpdate(order.id, OrderStatus.CANCELLED)}
                                            >
                                                Cancel Order
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium">No Orders Yet</h3>
                        <p className="text-muted-foreground">When customers place an order, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
