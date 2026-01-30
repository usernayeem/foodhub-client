"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ShoppingBag, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { ProviderService, ProviderDashboardData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

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
                console.error("Failed to fetch dashboard stats", error);
                toast({
                    title: "Error",
                    description: "Failed to load dashboard data. Please try again.",
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

    const { stats, recentOrders, topMeals } = data;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Button asChild>
                    <Link href="/provider/meals/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Meal
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">Pending / Preparing</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMeals}</div>
                        <p className="text-xs text-muted-foreground">{stats.availableMeals} available now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">{stats.completedOrders} completed</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            You have {stats.totalOrders} total orders.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentOrders.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No recent orders found.</p>
                            ) : (
                                recentOrders.map((order: any) => (
                                    <div key={order.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{order.customer?.name || "Guest"}</p>
                                            <p className="text-sm text-muted-foreground">{order.customer?.email}</p>
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
                        <CardTitle>Top Meals</CardTitle>
                        <CardDescription>
                            Your best performing meals.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {topMeals.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No meal data yet.</p>
                            ) : (
                                topMeals.map((meal: any) => (
                                    <div key={meal.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{meal.name}</p>
                                            <p className="text-sm text-muted-foreground">{meal.totalOrders} orders</p>
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
