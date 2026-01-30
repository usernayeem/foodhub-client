"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    title: string;
    links: {
        href: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
    }[];
}

export function DashboardSidebar({ title, links }: SidebarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b bg-background">
                <span className="font-bold text-lg">{title}</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute inset-y-0 left-0 w-3/4 bg-background border-r p-4" onClick={e => e.stopPropagation()}>
                        <div className="mb-8 font-bold text-xl">{title}</div>
                        <nav className="flex flex-col gap-2">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                return (
                                    <Button
                                        key={link.href}
                                        variant={isActive ? "secondary" : "ghost"}
                                        className={cn("justify-start gap-2", isActive && "bg-secondary")}
                                        asChild
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Link href={link.href}>
                                            <Icon className="h-4 w-4" />
                                            {link.label}
                                        </Link>
                                    </Button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r bg-muted/10 h-[calc(100vh-4rem)] sticky top-16">
                <div className="p-6 border-b">
                    <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
                </div>
                <div className="flex-1 py-4">
                    <nav className="grid gap-1 px-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Button
                                    key={link.href}
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn("justify-start gap-2", isActive && "bg-secondary")}
                                    asChild
                                >
                                    <Link href={link.href}>
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                        &copy; 2026 FoodHub
                    </p>
                </div>
            </div>
        </>
    );
}
