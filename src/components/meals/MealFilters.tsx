import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MealFilterState, Category } from "@/types";
import { Search } from "lucide-react";
import { MealService } from "@/services/api";

interface MealFiltersProps {
    filters: MealFilterState;
    setFilters: (filters: MealFilterState) => void;
}

export function MealFilters({ filters, setFilters }: MealFiltersProps) {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await MealService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, categoryId: e.target.value });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, sortBy: e.target.value as any });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search meals..."
                        className="pl-8"
                        value={filters.search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={filters.categoryId}
                    onChange={handleCategoryChange}
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={filters.sortBy}
                    onChange={handleSortChange}
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => setFilters({ search: "", categoryId: "all", sortBy: "newest" })}
            >
                Reset Filters
            </Button>
        </div>
    );
}
