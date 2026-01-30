"use client";

import { useEffect, useState } from "react";
import { AdminService } from "@/services/api";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Order {
    id: string;
    orderNumber: string;
    customer: {
        name: string;
        email: string;
    };
    provider: {
        user: {
            name: string;
        };
    };
    items: any[];
    totalAmount: number;
    status: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { toast } = useToast();

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        let filtered = orders;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (order) =>
                    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter((order) => order.status === statusFilter);
        }

        setFilteredOrders(filtered);
    }, [searchTerm, statusFilter, orders]);

    const loadOrders = async () => {
        try {
            const data = await AdminService.getAllOrders();
            setOrders(data);
            setFilteredOrders(data);
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

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            PENDING: "bg-yellow-100 text-yellow-800",
            PREPARING: "bg-blue-100 text-blue-800",
            READY: "bg-purple-100 text-purple-800",
            DELIVERED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
        };
        return (
            <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>
                {status}
            </Badge>
        );
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">All Orders</h1>
                <p className="text-muted-foreground">View and manage all system orders.</p>
            </div>

            <div className="flex gap-4">
                <Input
                    placeholder="Search by order number, customer name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PREPARING">Preparing</SelectItem>
                        <SelectItem value="READY">Ready</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">Order #</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Provider</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Items</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-3 font-mono text-sm">{order.orderNumber}</td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <div className="font-medium">{order.customer.name}</div>
                                            <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{order.provider.user.name}</td>
                                    <td className="px-4 py-3 text-sm">{order.items.length} item(s)</td>
                                    <td className="px-4 py-3 font-medium">${(order.totalAmount ?? 0).toFixed(2)}</td>
                                    <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        {searchTerm || statusFilter !== "all"
                            ? "No orders match your filters."
                            : "No orders found."}
                    </p>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-4">
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                    <div className="text-2xl font-bold">{orders.length}</div>
                </div>
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="text-2xl font-bold">
                        {orders.filter(o => o.status === "PENDING").length}
                    </div>
                </div>
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Delivered</div>
                    <div className="text-2xl font-bold">
                        {orders.filter(o => o.status === "DELIVERED").length}
                    </div>
                </div>
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="text-2xl font-bold">
                        ${orders.filter(o => o.status === "DELIVERED").reduce((sum, o) => sum + (o.totalAmount ?? 0), 0).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
