import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface MealCardProps {
    meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
                <Image
                    src={meal.image || "/placeholder-meal.jpg"}
                    alt={meal.name}
                    fill
                    className="object-cover"
                />
                {!meal.isAvailable && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Sold Out</Badge>
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{meal.name}</CardTitle>
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
                <Button className="w-full" disabled={!meal.isAvailable}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
