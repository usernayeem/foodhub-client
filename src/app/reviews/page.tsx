"use client";

import { useEffect, useState } from "react";
import { ReviewService } from "@/services/api";
import { Review } from "@/types";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewForm from "@/components/reviews/ReviewForm";
import { authClient } from "@/lib/auth-client";
import { MessageSquare, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyReviewsPage() {
    const { data: session } = authClient.useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchReviews = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await ReviewService.getMyReviews(page, 10);
            setReviews(response.data);
            setTotalPages(response.meta?.totalPages || 1);
            setCurrentPage(page);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch reviews");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews(1);
    }, []);

    const handleEdit = (review: Review) => {
        setEditingReview(review);
        setShowForm(true);
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            await ReviewService.deleteReview(reviewId);
            toast.success("Review deleted successfully");
            fetchReviews(currentPage);
        } catch (error: any) {
            toast.error(error.message || "Failed to delete review");
        }
    };

    const handleSubmit = async (data: { rating: number; comment: string }) => {
        if (!editingReview) return;

        try {
            await ReviewService.updateReview(editingReview.id, data);
            toast.success("Review updated successfully");
            setShowForm(false);
            setEditingReview(null);
            fetchReviews(currentPage);
        } catch (error: any) {
            throw error;
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingReview(null);
    };

    if (!session?.user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Please log in
                    </h1>
                    <p className="text-gray-600">
                        You need to be logged in to view your reviews
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="w-8 h-8 text-orange-600" />
                        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
                    </div>
                    <p className="text-gray-600">
                        Manage all your meal reviews in one place
                    </p>
                </div>

                {/* Reviews List */}
                <ReviewList
                    reviews={reviews}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={fetchReviews}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showMeal={true}
                    currentUserId={session.user.id}
                    isLoading={isLoading}
                />

                {/* Edit Form Modal */}
                {showForm && editingReview && (
                    <ReviewForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        initialData={{
                            rating: editingReview.rating,
                            comment: editingReview.comment || "",
                        }}
                        mealName={editingReview.meal?.name}
                        isEdit={true}
                    />
                )}
            </div>
        </div>
    );
}
