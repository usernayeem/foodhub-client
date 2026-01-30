export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

import { Meal, Category } from "@/types";

export interface GetMealsParams {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export const MealService = {
    async getAllMeals(params?: GetMealsParams): Promise<Meal[]> {
        const query = new URLSearchParams();
        if (params?.search) query.append("search", params.search);
        if (params?.categoryId && params.categoryId !== "all") query.append("categoryId", params.categoryId);
        if (params?.sortBy) {
            if (params.sortBy === "price-asc") {
                query.append("sortBy", "price");
                query.append("sortOrder", "asc");
            } else if (params.sortBy === "price-desc") {
                query.append("sortBy", "price");
                query.append("sortOrder", "desc");
            } else {
                query.append("sortBy", "createdAt");
                query.append("sortOrder", "desc");
            }
        }

        const res = await fetch(`${API_URL}/meals?${query.toString()}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch meals");
        }

        const data = await res.json();
        return data.data;
    },

    async getMealById(id: string): Promise<Meal> {
        const res = await fetch(`${API_URL}/meals/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch meal");
        }

        const data = await res.json();
        return data.data;
    },

    async getCategories(): Promise<Category[]> {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        return data.data;
    }
};

export interface ProviderStats {
    totalMeals: number;
    availableMeals: number;
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    totalReviews: number;
    averageRating: number;
}

export interface ProviderDashboardData {
    stats: ProviderStats;
    recentOrders: any[]; // refine type later
    topMeals: any[]; // refine type later
}

export const ProviderService = {
    async getDashboardStats(): Promise<ProviderDashboardData> {
        const res = await fetch(`${API_URL}/providers/dashboard/stats`, {
            // credentials: "include" is crucial for sending cookies
            credentials: "include",
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch provider stats");
        }

        return await res.json();
    }
};


