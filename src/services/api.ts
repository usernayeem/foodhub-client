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

export interface AdminDashboardData {
    users: {
        total: number;
        customers: number;
        providers: number;
        admins: number;
        active: number;
        suspended: number;
    };
    orders: {
        total: number;
        placed: number;
        preparing: number;
        ready: number;
        delivered: number;
        cancelled: number;
    };
    revenue: {
        total: number;
        trend: any[];
    };
    meals: {
        total: number;
        available: number;
    };
    categories: {
        total: number;
    };
    reviews: {
        total: number;
        averageRating: number;
    };
    recentOrders: any[];
    topProviders: any[];
}

export const AdminService = {
    async getDashboardStats(): Promise<AdminDashboardData> {
        const res = await fetch(`${API_URL}/admin/dashboard/stats`, {
            credentials: "include",
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch admin stats");
        }

        return await res.json();
    }
};


