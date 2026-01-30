import { Meal } from "@/types";
import { MealCard } from "./MealCard";

interface MealGridProps {
    meals: Meal[];
}

export function MealGrid({ meals }: MealGridProps) {
    if (meals.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No meals found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}
        </div>
    );
}
