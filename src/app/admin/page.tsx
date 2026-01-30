"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminService, AdminDashboardData } from "@/services/api";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Users, ShoppingBag, DollarSign, Utensils } from "lucide-react";

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
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    if (!data) {
        return <div className="p-8 text-center">Failed to load data.</div>;
    }

    const { users, orders, revenue, meals } = data;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {users.customers} customers, {users.providers} providers
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${revenue.total.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime Platform Revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.total}</div>
                        <p className="text-xs text-muted-foreground">{orders.delivered} delivered</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{meals.total}</div>
                        <p className="text-xs text-muted-foreground">{meals.available} available</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {data.recentOrders.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No recent orders.</p>
                            ) : (
                                data.recentOrders.map((order: any) => (
                                    <div key={order.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{order.customer?.name || "Guest"}</p>
                                            <p className="text-sm text-muted-foreground">{order.provider?.user?.name}</p>
                                        </div>
                                        <div className="ml-auto font-medium">+${order.totalAmount?.toFixed(2)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Providers</CardTitle>
                        <CardDescription>
                            Highest revenue generators.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {data.topProviders.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No provider data.</p>
                            ) : (
                                data.topProviders.map((provider: any) => (
                                    <div key={provider.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{provider.businessName || provider.user?.name}</p>
                                            <p className="text-sm text-muted-foreground">${provider.totalRevenue.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
