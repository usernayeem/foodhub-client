"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
    id: string; // This can be mealId for simplicity, or unique ID if variations exist
    mealId: string;
    name: string;
    price: number;
    image?: string | null;
    quantity: number;
    providerId: string;
}

export interface AddCartItem extends Omit<CartItem, "id" | "quantity"> {
    quantity?: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: AddCartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { toast } = useToast();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("foodhub-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("foodhub-cart", JSON.stringify(items));
    }, [items]);



    const addToCart = (newItem: AddCartItem) => {
        const quantityToAdd = newItem.quantity || 1;

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.mealId === newItem.mealId);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.mealId === newItem.mealId
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }

            return [...currentItems, {
                ...newItem,
                id: newItem.mealId,
                quantity: quantityToAdd,
                providerId: newItem.providerId
            }];
        });

        toast({
            title: "Added to cart",
            description: `${quantityToAdd} x ${newItem.name} has been added to your cart.`,
        });
    };

    const removeFromCart = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
