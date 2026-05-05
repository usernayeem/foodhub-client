"use client";

import { DashboardChart } from "@/components/dashboard/DashboardCharts"; // Wait, I named it DashboardCharts.tsx but exported DashboardChart. 
// Let's check the filename and export name.
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

// Mock data for analytics
const monthlyRevenue = [
    { name: "Jan", value: 4500 },
    { name: "Feb", value: 5200 },
    { name: "Mar", value: 4800 },
    { name: "Apr", value: 6100 },
    { name: "May", value: 5900 },
    { name: "Jun", value: 7200 },
    { name: "Jul", value: 8500 },
    { name: "Aug", value: 7800 },
    { name: "Sep", value: 9200 },
    { name: "Oct", value: 10500 },
    { name: "Nov", value: 11200 },
    { name: "Dec", value: 13500 },
];

const userGrowth = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 250 },
    { name: "Mar", value: 400 },
    { name: "Apr", value: 650 },
    { name: "May", value: 900 },
    { name: "Jun", value: 1200 },
    { name: "Jul", value: 1600 },
];

const categoryDistribution = [
    { name: "Main Course", value: 45 },
    { name: "Fast Food", value: 30 },
    { name: "Desserts", value: 15 },
    { name: "Drinks", value: 10 },
];

export default function AdminAnalyticsPage() {
    const stats = [
        {
            title: "Growth Rate",
            value: "24.5%",
            icon: TrendingUp,
            description: "Month over month growth",
            trend: { value: "+4.2%", positive: true }
        },
        {
            title: "New Customers",
            value: "1,240",
            icon: Users,
            description: "Registered this month",
            trend: { value: "+18%", positive: true }
        },
        {
            title: "Avg. Order Value",
            value: "$32.40",
            icon: ShoppingBag,
            description: "Per transaction",
            trend: { value: "+$2.10", positive: true }
        },
        {
            title: "Conversion Rate",
            value: "3.8%",
            icon: DollarSign,
            description: "Visitors to orders",
            trend: { value: "-0.2%", positive: false }
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Platform Analytics
                </h1>
                <p className="text-muted-foreground">Deep dive into FoodHub performance metrics and growth trends.</p>
            </div>

            <DashboardOverview stats={stats} />

            <div className="grid gap-6 md:grid-cols-2">
                <DashboardChart 
                    title="Annual Revenue Projection" 
                    description="Monthly revenue performance and growth"
                    data={monthlyRevenue}
                    type="area"
                    dataKey="value"
                />
                <DashboardChart 
                    title="User Acquisition" 
                    description="Cumulative user growth over time"
                    data={userGrowth}
                    type="line"
                    dataKey="value"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <DashboardChart 
                        title="Sales by Category" 
                        description="Order volume distribution"
                        data={categoryDistribution}
                        type="pie"
                        dataKey="value"
                    />
                </div>
                <div className="lg:col-span-2">
                    <DashboardChart 
                        title="Daily Active Users" 
                        description="User engagement over the last 30 days"
                        data={[
                            {name: "Mon", value: 450},
                            {name: "Tue", value: 520},
                            {name: "Wed", value: 480},
                            {name: "Thu", value: 610},
                            {name: "Fri", value: 790},
                            {name: "Sat", value: 850},
                            {name: "Sun", value: 720},
                        ]}
                        type="bar"
                        dataKey="value"
                    />
                </div>
            </div>
        </div>
    );
}
