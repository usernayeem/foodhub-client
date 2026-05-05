"use client";

import { useEffect, useState } from "react";
import { AdminService } from "@/services/api";
import { Loader2, ShoppingBag, CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { format } from "date-fns";

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
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        try {
            const data = await AdminService.getAllOrders();
            setOrders(data);
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

    const columns = [
        {
            header: "Order #",
            accessorKey: "orderNumber",
            render: (row: Order) => <span className="font-mono text-xs">#{row.orderNumber}</span>
        },
        {
            header: "Customer",
            accessorKey: "customer.name",
            render: (row: Order) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{row.customer.email}</span>
                </div>
            )
        },
        {
            header: "Provider",
            accessorKey: "provider.user.name",
        },
        {
            header: "Items",
            accessorKey: "items",
            render: (row: Order) => <Badge variant="outline">{row.items.length} items</Badge>
        },
        {
            header: "Total",
            accessorKey: "totalAmount",
            render: (row: Order) => <span className="font-bold">${(row.totalAmount ?? 0).toFixed(2)}</span>
        },
        {
            header: "Status",
            accessorKey: "status",
            render: (row: Order) => {
                const colors: Record<string, string> = {
                    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                    PREPARING: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                    READY: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
                    DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                };
                return (
                    <Badge className={colors[row.status] || "bg-gray-100 text-gray-800"}>
                        {row.status}
                    </Badge>
                );
            }
        },
        {
            header: "Date",
            accessorKey: "createdAt",
            render: (row: Order) => format(new Date(row.createdAt), "MMM dd, yyyy")
        }
    ];

    const stats = [
        {
            title: "Total Orders",
            value: orders.length,
            icon: ShoppingBag,
        },
        {
            title: "Pending Orders",
            value: orders.filter(o => o.status === "PENDING" || o.status === "PREPARING").length,
            icon: Clock,
        },
        {
            title: "Completed",
            value: orders.filter(o => o.status === "DELIVERED").length,
            icon: CheckCircle,
        },
        {
            title: "Total Revenue",
            value: `$${orders.filter(o => o.status === "DELIVERED").reduce((sum, o) => sum + (o.totalAmount ?? 0), 0).toFixed(2)}`,
            icon: DollarSign,
        }
    ];

    if (isLoading && orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading orders data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Orders Management
                </h1>
                <p className="text-muted-foreground">Monitor and manage all orders across the platform.</p>
            </div>

            <DashboardOverview stats={stats} />

            <DashboardTable 
                title="All System Orders" 
                data={orders} 
                columns={columns} 
                searchKey="orderNumber"
                pageSize={10}
            />
        </div>
    );
}
