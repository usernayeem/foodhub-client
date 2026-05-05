"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types";
import { ReviewService } from "@/services/api";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, MessageSquare, Star, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewStats from "@/components/reviews/ReviewStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserReviewsPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const { toast } = useToast();
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const response = await ReviewService.getMyReviews(page, 10);
            setReviews(response.data);
            setTotalPages(response.meta.totalPages);
            setTotalCount(response.meta.total);
            
            // Calculate average rating locally if backend meta doesn't provide it for my-reviews
            if (response.data.length > 0) {
                const sum = response.data.reduce((acc: number, r: Review) => acc + r.rating, 0);
                setAverageRating(sum / response.data.length);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            toast({
                title: "Error",
                description: "Failed to load your reviews.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending) {
            if (!session) {
                router.push("/login?redirect=/profile/reviews");
            } else {
                fetchReviews();
            }
        }
    }, [session, isPending, page]);

    const handleEdit = (review: Review) => {
        setEditingReview(review);
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        
        try {
            await ReviewService.deleteReview(reviewId);
            toast({
                title: "Success",
                description: "Review deleted successfully.",
            });
            fetchReviews();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete review.",
                variant: "destructive",
            });
        }
    };

    const handleUpdate = async (data: { rating: number; comment: string }) => {
        if (!editingReview) return;
        
        try {
            await ReviewService.updateReview(editingReview.id, data);
            toast({
                title: "Success",
                description: "Review updated successfully.",
            });
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update review.",
                variant: "destructive",
            });
        }
    };

    if (isPending || (isLoading && reviews.length === 0)) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Link href="/orders" className="inline-flex items-center text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                            My <span className="text-primary">Reviews</span>
                        </h1>
                        <p className="text-gray-400 max-w-md text-lg">
                            Your feedback helps us and the providers improve. Here are all the reviews you&apos;ve shared.
                        </p>
                    </div>

                    {totalCount > 0 && (
                        <div className="flex-shrink-0">
                            <ReviewStats 
                                averageRating={averageRating} 
                                totalReviews={totalCount} 
                                size="lg" 
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto">
                <ReviewList 
                    reviews={reviews}
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showMeal={true}
                    currentUserId={session.user.id}
                    isLoading={isLoading}
                />
            </div>

            {editingReview && (
                <ReviewForm 
                    isEdit={true}
                    initialData={{
                        rating: editingReview.rating,
                        comment: editingReview.comment || ""
                    }}
                    mealName={editingReview.meal?.name}
                    onCancel={() => setEditingReview(null)}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
}
