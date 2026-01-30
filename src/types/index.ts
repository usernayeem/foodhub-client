export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
  providerId: string;
  isAvailable: boolean;
  category?: Category;
  createdAt: string; // Serialized date
}

export interface MealFilterState {
  search: string;
  categoryId: string | "all";
  minPrice?: number;
  maxPrice?: number;
  sortBy: "newest" | "price-asc" | "price-desc";
}
