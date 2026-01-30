"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types";
import { AdminService, MealService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
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

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const { toast } = useToast();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema) as any,
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (editingCategory) {
            form.reset({
                name: editingCategory.name,
                description: editingCategory.description || "",
            });
        } else {
            form.reset({
                name: "",
                description: "",
            });
        }
    }, [editingCategory, form]);

    const loadCategories = async () => {
        try {
            const data = await MealService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load categories",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            if (editingCategory) {
                await AdminService.updateCategory(editingCategory.id, data);
                toast({ title: "Success", description: "Category updated successfully" });
            } else {
                await AdminService.createCategory(data);
                toast({ title: "Success", description: "Category created successfully" });
            }
            setIsDialogOpen(false);
            setEditingCategory(null);
            loadCategories();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save category",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await AdminService.deleteCategory(id);
            toast({ title: "Success", description: "Category deleted successfully" });
            loadCategories();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete category",
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
                    <h1 className="text-3xl font-bold tracking-tight">Categories Management</h1>
                    <p className="text-muted-foreground">Manage food categories here.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingCategory(null);
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingCategory(null)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to {editingCategory ? "update the" : "create a new"} category.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Italian, Chinese" {...field} />
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
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe the category..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                                {category.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setEditingCategory(category);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete "{category.name}"? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(category.id)}>
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

            {categories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No categories found. Create one to get started!</p>
                </div>
            )}
        </div>
    );
}
