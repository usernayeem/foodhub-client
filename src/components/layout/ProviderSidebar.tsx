"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { LayoutDashboard, Utensils, ShoppingBag, Settings } from "lucide-react";

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
];

export function ProviderSidebar() {
    return <DashboardSidebar title="Provider Portal" links={providerLinks} />;
}
