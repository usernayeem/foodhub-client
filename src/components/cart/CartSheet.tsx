"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export function CartSheet() {
    const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Your Cart ({cartCount})</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center space-y-2">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                        <SheetTrigger asChild>
                            <Button variant="link" className="text-primary">
                                Browse Meals
                            </Button>
                        </SheetTrigger>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4 py-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                                            <Image
                                                src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-4 text-center text-foreground">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-destructive hover:text-destructive"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-4 pt-4">
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Button className="w-full" asChild>
                                        <Link href="/checkout">Checkout</Link>
                                    </Button>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
