"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface MealCardProps {
    meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        // Prevent navigation to details page if clicking the add button
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            mealId: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            providerId: meal.providerId,
            quantity: 1
        });
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
            <Link href={`/meals/${meal.id}`} className="block relative w-full h-48 overflow-hidden">
                <Image
                    src={meal.image || "/placeholder-meal.jpg"}
                    alt={meal.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                {!meal.isAvailable && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Sold Out</Badge>
                    </div>
                )}
            </Link>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Link href={`/meals/${meal.id}`} className="hover:underline">
                        <CardTitle className="text-xl">{meal.name}</CardTitle>
                    </Link>
                    <span className="font-bold text-lg text-primary">${meal.price.toFixed(2)}</span>
                </div>
                {meal.category && (
                    <Badge variant="secondary" className="w-fit">
                        {meal.category.name}
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-2">{meal.description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex w-full gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/meals/${meal.id}`}>
                            View Details
                        </Link>
                    </Button>
                    <Button
                        className="flex-1"
                        disabled={!meal.isAvailable}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
