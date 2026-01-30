"use client";

import { Meal } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, Utensils } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface MealDetailProps {
    meal: Meal;
}

export function MealDetail({ meal }: MealDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            mealId: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            providerId: meal.providerId,
            quantity: quantity
        });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden rounded-xl border bg-muted">
                {meal.image ? (
                    <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                        priority
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Utensils className="h-20 w-20 opacity-20" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-sm">
                            {meal.category?.name || "Meal"}
                        </Badge>
                        <Badge variant={meal.isAvailable ? "outline" : "destructive"}>
                            {meal.isAvailable ? "Available" : "Sold Out"}
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{meal.name}</h1>
                    <p className="text-3xl font-bold text-primary">${meal.price.toFixed(2)}</p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{meal.description}</p>
                </div>

                <div className="flex flex-col gap-4 mt-auto pt-6 border-t">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1 || !meal.isAvailable}
                            >
                                -
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                                disabled={!meal.isAvailable}
                            >
                                +
                            </Button>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            Total: <span className="font-semibold text-foreground">${(meal.price * quantity).toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        className="w-full md:w-auto gap-2"
                        onClick={handleAddToCart}
                        disabled={!meal.isAvailable}
                    >
                        <ShoppingCart className="h-3 w-3" />
                        Add to Cart
                    </Button>
                </div>

                <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Freshly prepared</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Utensils className="h-4 w-4" />
                        <span>Quality ingredients</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
