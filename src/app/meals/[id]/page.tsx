import { MealService } from "@/services/api";
import { MealDetail } from "@/components/meals/MealDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const meal = await MealService.getMealById(id);
        return {
            title: `${meal.name} | FoodHub`,
            description: meal.description,
        };
    } catch (error) {
        return {
            title: "Meal Not Found",
        };
    }
}

export default async function MealPage({ params }: Props) {
    const { id } = await params;

    try {
        const meal = await MealService.getMealById(id);
        return (
            <div className="container py-8 px-4 md:px-6">
                <MealDetail meal={meal} />
            </div>
        );
    } catch (error) {
        notFound();
    }
}
