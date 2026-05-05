"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, ShoppingCart, LogOut, User, Settings, CreditCard, Heart, UtensilsCrossed, Info, PhoneCall } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CartSheet } from "@/components/cart/CartSheet"
import { authClient } from "@/lib/auth-client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session } = authClient.useSession()
    const user = session?.user as any

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const navLinks = [
        { name: "Home", href: "/", icon: <UtensilsCrossed className="w-4 h-4" /> },
        { name: "Meals", href: "/meals", icon: null },
        { name: "About", href: "/about", icon: null },
        { name: "Contact", href: "/contact", icon: null },
    ]

    const loggedInLinks = [
        { name: "Home", href: "/", icon: <UtensilsCrossed className="w-4 h-4" /> },
        { name: "Meals", href: "/meals", icon: null },
        { 
            name: "Dashboard", 
            href: user?.role === "PROVIDER" ? "/provider" : user?.role === "ADMIN" ? "/admin" : "/orders", 
            icon: null 
        },
        { name: "Profile", href: "/profile", icon: null },
        { name: "About", href: "/about", icon: null },
        { name: "Contact", href: "/contact", icon: null },
    ]

    const linksToRender = session ? loggedInLinks : navLinks

    if (!mounted) return null

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 active:scale-95">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                <UtensilsCrossed className="h-6 w-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                                FoodHub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        <div className="flex items-center space-x-1 bg-muted/50 p-1 rounded-full border border-border/50">
                            {linksToRender.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium rounded-full hover:bg-background hover:shadow-sm transition-all duration-200 text-muted-foreground hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="h-6 w-[1px] bg-border mx-2" />

                        <div className="flex items-center gap-2">
                            <CartSheet />

                            {/* Theme Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full hover:bg-accent transition-colors"
                            >
                                {theme === "dark" ? (
                                    <Moon className="h-5 w-5 text-blue-400" />
                                ) : (
                                    <Sun className="h-5 w-5 text-yellow-500" />
                                )}
                                <span className="sr-only">Toggle theme</span>
                            </Button>

                            {session ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/10 ring-offset-2 ring-offset-background hover:ring-primary/30 transition-all">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.image} alt={user?.name} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user?.name?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 mt-2 p-2 rounded-2xl shadow-xl border-border/50 backdrop-blur-xl" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1 p-2">
                                                <p className="text-sm font-semibold leading-none">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                                                <Link href="/profile" className="flex items-center">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            
                                            
                                            {(user?.role === "PROVIDER" || user?.role === "ADMIN") && (
                                                <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-primary focus:text-primary">
                                                    <Link href={user.role === "PROVIDER" ? "/provider" : "/admin"} className="flex items-center">
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        <span>Dashboard</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                                            onClick={async () => {
                                                await authClient.signOut()
                                                window.location.href = "/"
                                            }}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2 ml-2">
                                    <Button variant="ghost" asChild className="rounded-full px-6">
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild className="rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-primary to-orange-600 hover:opacity-90 border-none">
                                        <Link href="/register">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-x-2 md:hidden">
                        <CartSheet />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-primary hover:bg-primary/10 rounded-full"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={cn(
                    "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
                    isMenuOpen ? "max-h-[500px] opacity-100 py-6 border-t" : "max-h-0 opacity-0 py-0"
                )}>
                    <div className="grid gap-4">
                        {linksToRender.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-2xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-[1px] bg-border my-2" />

                        {session ? (
                            <div className="grid gap-2">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-2xl transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="h-5 w-5" />
                                    Profile Settings
                                </Link>
                                <Button
                                    variant="destructive"
                                    className="w-full justify-start rounded-2xl h-12 px-4"
                                    onClick={async () => {
                                        await authClient.signOut()
                                        window.location.href = "/"
                                    }}
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-3 pt-2">
                                <Button variant="outline" asChild className="w-full rounded-2xl h-12">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                </Button>
                                <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-primary to-orange-600 border-none">
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center justify-between px-4 pt-4 border-t mt-2">
                            <span className="text-sm text-muted-foreground">Appearance</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full"
                            >
                                {theme === "dark" ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                                {theme === "dark" ? "Dark Mode" : "Light Mode"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

