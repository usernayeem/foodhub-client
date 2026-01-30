"use client";

import { useState, useEffect } from "react";
import { MealFilters } from "@/components/meals/MealFilters";
import { MealGrid } from "@/components/meals/MealGrid";
import { Meal, MealFilterState } from "@/types";
import { MealService } from "@/services/api";

export default function MealsPage() {
    const [filters, setFilters] = useState<MealFilterState>({
        search: "",
        categoryId: "all",
        sortBy: "newest"
    });
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const data = await MealService.getAllMeals({
                    search: filters.search,
                    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
                    sortBy: filters.sortBy
                });
                setMeals(data);
            } catch (error) {
                console.error("Failed to fetch meals:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchMeals();
        }, 300); // 300ms debounce for search

        return () => clearTimeout(debounceTimer);
    }, [filters]);

    return (
        <div className="container py-8 px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-8">Explore Meals</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 shrink-0">
                    <MealFilters filters={filters} setFilters={setFilters} />
                </aside>

                <main className="flex-1">
                    {loading ? (
                        <div className="text-center py-12">Loading meals...</div>
                    ) : (
                        <MealGrid meals={meals} />
                    )}
                </main>
            </div>
        </div>
    );
}
