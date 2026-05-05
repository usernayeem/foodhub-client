"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { ShoppingBag, Star, Heart, User } from "lucide-react";

const customerLinks = [
    {
        href: "/orders",
        label: "My Orders",
        icon: ShoppingBag,
    },
    {
        href: "/profile/reviews",
        label: "My Reviews",
        icon: Star,
    },
    {
        href: "/checkout",
        label: "Favorites",
        icon: Heart,
    },
    {
        href: "/profile",
        label: "Profile Settings",
        icon: User,
    },
];

export function CustomerSidebar() {
    return <DashboardSidebar title="Customer Portal" links={customerLinks} />;
}
