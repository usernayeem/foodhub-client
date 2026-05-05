"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { LayoutDashboard, Utensils, ShoppingBag, Star } from "lucide-react";

const providerLinks = [
    {
        href: "/provider",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        href: "/provider/meals",
        label: "My Meals",
        icon: Utensils,
    },
    {
        href: "/provider/orders",
        label: "Orders",
        icon: ShoppingBag,
    },
    {
        href: "/provider/reviews",
        label: "Reviews",
        icon: Star,
    },
];

export function ProviderSidebar() {
    return <DashboardSidebar title="Manager Portal" links={providerLinks} />;
}
