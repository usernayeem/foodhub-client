export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

import { Meal, Category } from "@/types";

export interface GetMealsParams {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
    dietary?: string[];
}

export const MealService = {
    async getAllMeals(params?: GetMealsParams): Promise<{ data: Meal[], meta: any }> {
        const query = new URLSearchParams();
        if (params?.search) query.append("search", params.search);
        if (params?.categoryId && params.categoryId !== "all") query.append("categoryId", params.categoryId);
        if (params?.dietary && params.dietary.length > 0) {
            if (params.dietary.includes("Vegetarian")) query.append("isVegetarian", "true");
            if (params.dietary.includes("Vegan")) query.append("isVegan", "true");
            if (params.dietary.includes("Gluten-Free")) query.append("isGlutenFree", "true");
        }
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

        if (params?.page) query.append("page", params.page.toString());
        if (params?.limit) query.append("limit", params.limit.toString());

        const res = await fetch(`${API_URL}/meals?${query.toString()}`);

        if (!res.ok) {
            throw new Error("Failed to fetch meals");
        }

        const data = await res.json();
        return data; // Returns { data: Meal[], meta: { total, page, limit, totalPages } }
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
            throw new Error(`Failed to fetch provider stats: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    },

    async getMeals(page = 1, limit = 10): Promise<{ data: Meal[], meta: any }> {
        const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        const res = await fetch(`${API_URL}/meals/my-meals?${query.toString()}`, {
            credentials: "include",
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch provider meals: ${res.status} ${res.statusText}`);
        return await res.json();
    },

    async createMeal(data: any): Promise<Meal> {
        const res = await fetch(`${API_URL}/meals`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to create meal");
        const dataRes = await res.json();
        return dataRes.data;
    },

    async updateMeal(id: string, data: any): Promise<Meal> {
        const res = await fetch(`${API_URL}/meals/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to update meal");
        const dataRes = await res.json();
        return dataRes.data;
    },

    async deleteMeal(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/meals/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to delete meal");
    },

    async getOrders(page = 1, limit = 10): Promise<{ data: any[], meta: any }> { // refine type
        const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        const res = await fetch(`${API_URL}/orders/my-orders?${query.toString()}`, {
            credentials: "include",
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch provider orders: ${res.status} ${res.statusText}`);
        return await res.json();
    },

    async updateOrderStatus(id: string, status: string): Promise<void> {
        const res = await fetch(`${API_URL}/orders/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to update order status");
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
        available: number; // Corrected field name based on typical usage or kept simple
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
    },

    async getAllUsers(page = 1, limit = 10): Promise<{ data: any[], meta: any }> {
        const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        const res = await fetch(`${API_URL}/admin/users?${query.toString()}`, {
            credentials: "include",
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        return await res.json();
    },

    async updateUserStatus(userId: string, status: string): Promise<any> {
        const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to update user status");
        return await res.json();
    },

    async getAllOrders(): Promise<any[]> {
        const res = await fetch(`${API_URL}/admin/orders`, {
            credentials: "include",
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
        const data = await res.json();
        return data.data;
    },

    async createCategory(data: { name: string; description?: string }): Promise<Category> {
        const res = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to create category");
        const result = await res.json();
        return result.data;
    },

    async updateCategory(id: string, data: { name: string; description?: string }): Promise<Category> {
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to update category");
        const result = await res.json();
        return result.data;
    },

    async deleteCategory(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to delete category");
    }
};

export const UserService = {
    async updateProfile(data: { name?: string; phone?: string; address?: string }): Promise<any> {
        const res = await fetch(`${API_URL}/users/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to update profile");
        const result = await res.json();
        return result.data;
    },

    async getProfile(): Promise<any> {
        return null;
    }
};


