"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { LayoutDashboard, Users, ShoppingBag, Settings, Utensils } from "lucide-react";

const adminLinks = [
    {
        href: "/admin",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        href: "/admin/users",
        label: "Users",
        icon: Users,
    },
    {
        href: "/admin/orders",
        label: "All Orders",
        icon: ShoppingBag,
    },
    {
        href: "/admin/categories",
        label: "Categories",
        icon: Utensils,
    },
    {
        href: "/admin/analytics",
        label: "Analytics",
        icon: Settings, // Using Settings for now as a placeholder for Analytics
    },
];

export function AdminSidebar() {
    return <DashboardSidebar title="Admin Portal" links={adminLinks} />;
}
