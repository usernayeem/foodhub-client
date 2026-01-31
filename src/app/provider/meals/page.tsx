"use client";

import { useEffect, useState } from "react";
import { Meal, Category } from "@/types";
import { ProviderService, MealService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, FileImage, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { uploadImage } from "@/lib/uploadImage";
import { PaginationControls } from "@/components/ui/PaginationControls";

const mealSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(0.1, "Price must be greater than 0"),
    categoryId: z.string().min(1, "Please select a category"),
    image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
});

type MealFormValues = z.infer<typeof mealSchema>;

export default function ProviderMealsPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const form = useForm<MealFormValues>({
        resolver: zodResolver(mealSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            categoryId: "",
            image: "",
        },
    });

    useEffect(() => {
        loadData();
    }, [page]);

    useEffect(() => {
        if (editingMeal) {
            form.reset({
                name: editingMeal.name,
                description: editingMeal.description,
                price: editingMeal.price,
                categoryId: editingMeal.categoryId,
                image: editingMeal.image || "",
            });
        } else {
            form.reset({
                name: "",
                description: "",
                price: 0,
                categoryId: "",
                image: "",
            });
        }
    }, [editingMeal, form]);

    const loadData = async () => {
        try {
            const [mealsData, categoriesData] = await Promise.all([
                ProviderService.getMeals(page, 9),
                MealService.getCategories()
            ]);
            setMeals(mealsData.data);
            setTotalPages(mealsData.meta?.totalPages || 1);
            setCategories(categoriesData);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load data",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview("");
    };

    const onSubmit = async (data: MealFormValues) => {
        try {
            setIsUploading(true);

            // Upload image if a new file is selected
            let imageUrl = data.image || "";
            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            const mealData = { ...data, image: imageUrl };

            if (editingMeal) {
                await ProviderService.updateMeal(editingMeal.id, mealData);
                toast({ title: "Success", description: "Meal updated successfully" });
            } else {
                await ProviderService.createMeal(mealData);
                toast({ title: "Success", description: "Meal created successfully" });
            }
            setIsDialogOpen(false);
            setEditingMeal(null);
            setSelectedFile(null);
            setImagePreview("");
            loadData();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save meal",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await ProviderService.deleteMeal(id);
            toast({ title: "Success", description: "Meal deleted successfully" });
            loadData();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete meal",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Meals</h1>
                    <p className="text-muted-foreground">Manage your menu items here.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) {
                        setEditingMeal(null);
                        setSelectedFile(null);
                        setImagePreview("");
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingMeal(null)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Meal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingMeal ? "Edit Meal" : "Add New Meal"}</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to {editingMeal ? "update the" : "create a new"} meal.
                            </DialogDescription>
                        </DialogHeader>
                        {categories.length === 0 && (
                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-sm mb-4">
                                <strong>Warning:</strong> No categories found. You cannot add a meal until an Admin creates categories.
                            </div>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Burger, Pizza, etc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe the meal..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price ($)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={categories.length === 0}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={categories.length > 0 ? "Select category" : "No categories found"} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((cat) => (
                                                            <SelectItem key={cat.id} value={cat.id}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <FormLabel>Meal Image (Optional)</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="flex-1"
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="relative w-full h-40 rounded-md overflow-hidden border">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                    {editingMeal?.image && !imagePreview && (
                                        <div className="relative w-full h-40 rounded-md overflow-hidden border">
                                            <Image
                                                src={editingMeal.image}
                                                alt="Current image"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={form.formState.isSubmitting || isUploading}>
                                        {(form.formState.isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isUploading ? "Uploading..." : "Save Changes"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                    <div key={meal.id} className="relative group bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-video relative bg-muted flex items-center justify-center">
                            {meal.image ? (
                                <Image
                                    src={meal.image}
                                    alt={meal.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <FileImage className="h-10 w-10 text-muted-foreground/50" />
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold truncate pr-2" title={meal.name}>{meal.name}</h3>
                                <span className="font-bold text-primary">${meal.price.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                {meal.description}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                        setEditingMeal(meal);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className="px-3">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete "{meal.name}". This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(meal.id)} className="bg-destructive hover:bg-destructive/90">
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {meals.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">You haven't added any meals yet.</p>
                    <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                        Create your first meal
                    </Button>
                </div>
            )}
        </div>
    );
}
