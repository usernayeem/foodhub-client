"use client";

import { Meal, Review } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, Utensils, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ReviewService } from "@/services/api";
import ReviewStats from "@/components/reviews/ReviewStats";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewForm from "@/components/reviews/ReviewForm";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import DeleteConfirmDialog from "@/components/ui/DeleteConfirmDialog";

interface MealDetailProps {
    meal: Meal;
}

export function MealDetail({ meal }: MealDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { data: session } = authClient.useSession();

    // Review states
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    const [userHasReviewed, setUserHasReviewed] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            mealId: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            providerId: meal.providerId,
            quantity: quantity
        });
    };

    const fetchReviews = async (page: number) => {
        setIsLoadingReviews(true);
        try {
            const response = await ReviewService.getMealReviews(meal.id, page, 5);
            setReviews(response.data);
            setTotalPages(response.meta?.totalPages || 1);
            setTotalReviews(response.meta?.total || 0);
            setCurrentPage(page);

            // Check if current user has already reviewed - fetch all reviews to check properly
            if (session?.user?.id) {
                // Fetch all reviews (or at least enough to check) by requesting a large page size
                const allReviewsResponse = await ReviewService.getMealReviews(meal.id, 1, 1000);
                const hasReviewed = allReviewsResponse.data.some(
                    (review: Review) => review.userId === session.user.id
                );
                setUserHasReviewed(hasReviewed);
            }

            // Calculate average rating
            if (response.data.length > 0) {
                const sum = response.data.reduce((acc: number, r: Review) => acc + r.rating, 0);
                setAverageRating(sum / response.data.length);
            }
        } catch (error: any) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setIsLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchReviews(1);
    }, [meal.id, session?.user?.id]);

    const handleSubmitReview = async (data: { rating: number; comment: string }) => {
        try {
            if (editingReview) {
                // Update existing review
                await ReviewService.updateReview(editingReview.id, data);
                toast.success("Review updated successfully!");
            } else {
                // Double-check if user has already reviewed before submitting
                if (userHasReviewed) {
                    toast.error("You have already reviewed this meal. Please edit your existing review instead.");
                    setShowReviewForm(false);
                    return;
                }

                // Create new review
                await ReviewService.createReview({
                    mealId: meal.id,
                    rating: data.rating,
                    comment: data.comment,
                });
                toast.success("Review submitted successfully!");
            }
            setShowReviewForm(false);
            setEditingReview(null);
            fetchReviews(currentPage);
        } catch (error: any) {
            // Handle duplicate review error from backend
            if (error.message?.includes("already reviewed") || error.message?.includes("duplicate")) {
                toast.error("You have already reviewed this meal. Please edit your existing review instead.");
                setShowReviewForm(false);
                setUserHasReviewed(true); // Immediately update state to hide button
                // Refresh to update userHasReviewed state
                fetchReviews(currentPage);
            } else {
                throw error;
            }
        }
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setShowReviewForm(true);
    };

    const handleWriteReview = () => {
        if (userHasReviewed && !editingReview) {
            toast.error("You have already reviewed this meal. You can edit your existing review.");
            return;
        }
        setShowReviewForm(true);
    };

    const handleDeleteReview = (reviewId: string) => {
        setReviewToDelete(reviewId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!reviewToDelete) return;

        try {
            await ReviewService.deleteReview(reviewToDelete);
            toast.success("Review deleted successfully!");
            setDeleteConfirmOpen(false);
            setReviewToDelete(null);
            fetchReviews(currentPage);
        } catch (error: any) {
            toast.error(error.message || "Failed to delete review");
            setDeleteConfirmOpen(false);
            setReviewToDelete(null);
        }
    };

    const handleCancelReview = () => {
        setShowReviewForm(false);
        setEditingReview(null);
    };

    const cancelDelete = () => {
        setDeleteConfirmOpen(false);
        setReviewToDelete(null);
    };

    return (
        <div className="space-y-12">
            {/* Meal Details Section */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden rounded-xl border bg-muted">
                    {meal.image ? (
                        <Image
                            src={meal.image}
                            alt={meal.name}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                            priority
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <Utensils className="h-20 w-20 opacity-20" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-sm">
                                {meal.category?.name || "Meal"}
                            </Badge>
                            <Badge variant={meal.isAvailable ? "outline" : "destructive"}>
                                {meal.isAvailable ? "Available" : "Sold Out"}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{meal.name}</h1>
                        <p className="text-3xl font-bold text-primary">${meal.price.toFixed(2)}</p>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-muted-foreground">{meal.description}</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto pt-6 border-t">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1 || !meal.isAvailable}
                                >
                                    -
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={!meal.isAvailable}
                                >
                                    +
                                </Button>
                            </div>
                            <div className="text-muted-foreground text-sm">
                                Total: <span className="font-semibold text-foreground">${(meal.price * quantity).toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full md:w-auto gap-2"
                            onClick={handleAddToCart}
                            disabled={!meal.isAvailable}
                        >
                            <ShoppingCart className="h-3 w-3" />
                            Add to Cart
                        </Button>
                    </div>

                    <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Freshly prepared</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Utensils className="h-4 w-4" />
                            <span>Quality ingredients</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-12">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-orange-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                    </div>
                    {session?.user && !userHasReviewed && (
                        <Button
                            onClick={handleWriteReview}
                            className="gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Write a Review
                        </Button>
                    )}
                </div>

                {/* Review Stats */}
                {totalReviews > 0 && (
                    <div className="mb-8">
                        <ReviewStats
                            averageRating={averageRating}
                            totalReviews={totalReviews}
                            size="md"
                        />
                    </div>
                )}

                {/* Review List */}
                <ReviewList
                    reviews={reviews}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={fetchReviews}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                    currentUserId={session?.user?.id}
                    isLoading={isLoadingReviews}
                />

                {/* Review Form Modal */}
                {showReviewForm && (
                    <ReviewForm
                        onSubmit={handleSubmitReview}
                        onCancel={handleCancelReview}
                        initialData={editingReview ? {
                            rating: editingReview.rating,
                            comment: editingReview.comment || "",
                        } : undefined}
                        mealName={meal.name}
                        isEdit={!!editingReview}
                    />
                )}

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmDialog
                    isOpen={deleteConfirmOpen}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    title="Delete Review"
                    message="Are you sure you want to delete this review? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </div>
        </div>
    );
}

