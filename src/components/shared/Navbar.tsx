"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CartSheet } from "@/components/cart/CartSheet"

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <span className="text-2xl">🍱</span>
                            <span>FoodHub</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/meals" className="text-sm font-medium hover:text-primary transition-colors">
                            Browse Meals
                        </Link>
                        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                            Login
                        </Link>
                        <Link href="/register" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                            Sign Up
                        </Link>

                        <CartSheet />

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                            {mounted && theme === "dark" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-x-2 md:hidden">
                        <CartSheet />
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                            {mounted && theme === "dark" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground text-primary"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-4">
                        <Link
                            href="/meals"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Browse Meals
                        </Link>
                        <Link
                            href="/login"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
