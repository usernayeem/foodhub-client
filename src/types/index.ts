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
  dietary: string[];
}

export enum OrderStatus {
  PLACED = "PLACED",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderItem {
  id: string;
  orderId: string;
  mealId: string;
  meal?: Meal; // Relationship
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
