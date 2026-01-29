import { fetcher } from "@/lib/api";

export interface Category {
    id: string;
    name: string;
    // Backend might mock icon or we map it on frontend if missing
    // Assuming backend returns { id, name, ... }
    icon?: string;
    slug?: string;
}

// Helper to map backend data to frontend UI if needed
const ICON_MAP: Record<string, string> = {
    "Burger": "🍔",
    "Pizza": "🍕",
    "Asian": "🍜",
    "Dessert": "🍰",
    "Healthy": "🥗",
    "Drinks": "🥤",
};

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetcher<{ data: Category[] }>("/categories");
        // Enrich with icons if missing
        return response.data.map(cat => ({
            ...cat,
            icon: cat.icon || ICON_MAP[cat.name] || "🍽️",
            slug: cat.slug || cat.name.toLowerCase(),
        }));
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

