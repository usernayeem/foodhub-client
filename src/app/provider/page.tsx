"use client";

import { useEffect, useState } from "react";
import { ProviderService, ProviderDashboardData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Utensils, DollarSign, PlusCircle, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardChart } from "@/components/dashboard/DashboardCharts";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ProviderDashboard() {
    const [data, setData] = useState<ProviderDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await ProviderService.getDashboardStats();
                setData(stats);
            } catch (error) {
                console.error("Failed to fetch provider stats", error);
                toast({
                    title: "Error",
                    description: "Failed to load dashboard data.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [toast]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse text-muted-foreground font-medium">Loading manager dashboard...</div>
            </div>
        );
    }

    if (!data) {
        return <div className="p-8 text-center text-destructive">Failed to load data.</div>;
    }

    const { stats, recentOrders, topMeals } = data;

    const overviewStats = [
        {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            description: "Lifetime earnings",
            trend: { value: "+15.3%", positive: true }
        },
        {
            title: "Active Orders",
            value: stats.pendingOrders,
            icon: ShoppingBag,
            description: "Pending / Preparing",
            trend: { value: "-2", positive: false }
        },
        {
            title: "Total Meals",
            value: stats.totalMeals,
            icon: Utensils,
            description: `${stats.availableMeals} currently available`,
            trend: { value: "+1", positive: true }
        },
        {
            title: "Average Rating",
            value: stats.averageRating.toFixed(1),
            icon: Star,
            description: `From ${stats.totalReviews} reviews`,
            trend: { value: "+0.2", positive: true }
        },
    ];

    const mealData = topMeals.map(m => ({
        name: m.name,
        orders: m.totalOrders
    }));

    // Mock revenue history for manager
    const revenueHistory = [
        { name: "Mon", value: 120 },
        { name: "Tue", value: 340 },
        { name: "Wed", value: 200 },
        { name: "Thu", value: 450 },
        { name: "Fri", value: 600 },
        { name: "Sat", value: 850 },
        { name: "Sun", value: 720 },
    ];

    const orderColumns = [
        {
            header: "Order ID",
            accessorKey: "id",
            render: (row: any) => <span className="font-mono text-xs text-muted-foreground">#{row.id.slice(-6)}</span>
        },
        {
            header: "Customer",
            accessorKey: "customer.name",
            render: (row: any) => row.customer?.name || "Guest"
        },
        {
            header: "Amount",
            accessorKey: "totalAmount",
            render: (row: any) => <span className="font-bold">${row.totalAmount.toFixed(2)}</span>
        },
        {
            header: "Status",
            accessorKey: "status",
            render: (row: any) => (
                <Badge variant={row.status === "DELIVERED" ? "success" : row.status === "CANCELLED" ? "destructive" : "secondary"}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: "Date",
            accessorKey: "createdAt",
            render: (row: any) => format(new Date(row.createdAt), "MMM dd, HH:mm")
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                        Manager Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your kitchen, track orders, and monitor performance.
                    </p>
                </div>
                <Button asChild className="rounded-full shadow-lg hover:shadow-xl transition-all">
                    <Link href="/provider/meals/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Meal
                    </Link>
                </Button>
            </div>

            <DashboardOverview stats={overviewStats} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="md:col-span-4">
                    <DashboardChart 
                        title="Weekly Revenue" 
                        description="Revenue performance over the last 7 days"
                        data={revenueHistory}
                        type="bar"
                        dataKey="value"
                    />
                </div>
                <div className="md:col-span-3">
                    <DashboardChart 
                        title="Top Performing Meals" 
                        description="Based on total order volume"
                        data={mealData.length > 0 ? mealData : [{name: "No Data", orders: 0}]}
                        type="line"
                        dataKey="orders"
                    />
                </div>
            </div>

            <DashboardTable 
                title="Recent Orders" 
                data={recentOrders} 
                columns={orderColumns}
                pageSize={5}
                searchKey="id"
            />
        </div>
    );
}
