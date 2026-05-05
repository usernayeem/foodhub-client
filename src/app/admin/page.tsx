"use client";

import { useEffect, useState } from "react";
import { AdminService, AdminDashboardData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Users, ShoppingBag, DollarSign, Utensils, TrendingUp } from "lucide-react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardChart } from "@/components/dashboard/DashboardCharts";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminDashboard() {
    const [data, setData] = useState<AdminDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await AdminService.getDashboardStats();
                setData(stats);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
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
                <div className="animate-pulse text-muted-foreground font-medium">Loading dashboard data...</div>
            </div>
        );
    }

    if (!data) {
        return <div className="p-8 text-center text-destructive">Failed to load dashboard data. Please try again.</div>;
    }

    const stats = [
        {
            title: "Total Users",
            value: data.users.total,
            icon: Users,
            description: `${data.users.customers} customers, ${data.users.providers} providers`,
            trend: { value: "+12%", positive: true }
        },
        {
            title: "Total Revenue",
            value: `$${data.revenue.total.toLocaleString()}`,
            icon: DollarSign,
            description: "Platform lifetime revenue",
            trend: { value: "+8.4%", positive: true }
        },
        {
            title: "Total Orders",
            value: data.orders.total,
            icon: ShoppingBag,
            description: `${data.orders.delivered} orders delivered`,
            trend: { value: "+5.2%", positive: true }
        },
        {
            title: "Available Meals",
            value: data.meals.available,
            icon: Utensils,
            description: `Out of ${data.meals.total} total meals`,
            trend: { value: "+2.1%", positive: true }
        },
    ];

    // Mock trend data if none exists in revenue.trend
    const chartData = data.revenue.trend.length > 0 ? data.revenue.trend : [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
        { name: "Jul", value: 3490 },
    ];

    const providerData = data.topProviders.map(p => ({
        name: p.businessName || p.user?.name || "Unknown",
        revenue: p.totalRevenue
    }));

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
            header: "Total",
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
            render: (row: any) => format(new Date(row.createdAt), "MMM dd, yyyy")
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Admin Overview
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with FoodHub today.
                </p>
            </div>

            <DashboardOverview stats={stats} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="md:col-span-4">
                    <DashboardChart 
                        title="Revenue Trend" 
                        description="Monthly revenue growth over the current year"
                        data={chartData}
                        type="area"
                        dataKey="value"
                    />
                </div>
                <div className="md:col-span-3">
                    <DashboardChart 
                        title="Top Providers" 
                        description="Revenue distribution by top providers"
                        data={providerData.length > 0 ? providerData : [{name: "No Data", revenue: 0}]}
                        type="pie"
                        dataKey="revenue"
                    />
                </div>
            </div>

            <DashboardTable 
                title="Recent Orders" 
                data={data.recentOrders} 
                columns={orderColumns}
                pageSize={5}
                searchKey="id"
            />
        </div>
    );
}
