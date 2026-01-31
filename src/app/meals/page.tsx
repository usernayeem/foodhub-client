"use client";

import { useState, useEffect } from "react";
import { MealFilters } from "@/components/meals/MealFilters";
import { MealGrid } from "@/components/meals/MealGrid";
import { MealSkeleton } from "@/components/meals/MealSkeleton";
import { Meal, MealFilterState } from "@/types";
import { MealService } from "@/services/api";

import { PaginationControls } from "@/components/ui/PaginationControls";

export default function MealsPage() {
    const [filters, setFilters] = useState<MealFilterState>({
        search: "",
        categoryId: "all",
        sortBy: "newest",
        dietary: []
    });
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [filters]);

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const response = await MealService.getAllMeals({
                    search: filters.search,
                    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
                    sortBy: filters.sortBy,
                    page: page,
                    limit: 9, // 3x3 grid
                    dietary: filters.dietary
                });
                setMeals(response.data);
                setTotalPages(response.meta.totalPages);
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
    }, [filters, page]);

    return (
        <div className="container py-8 px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-8">Explore Meals</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 shrink-0">
                    <MealFilters filters={filters} setFilters={setFilters} />
                </aside>

                <main className="flex-1">
                    {loading ? (
                        <MealSkeleton />
                    ) : (
                        <>
                            <MealGrid meals={meals} />
                            <PaginationControls
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
