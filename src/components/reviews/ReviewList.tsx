"use client";

import { Review } from "@/types";
import ReviewCard from "./ReviewCard";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

interface ReviewListProps {
    reviews: Review[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: string) => void;
    showMeal?: boolean;
    currentUserId?: string;
    isLoading?: boolean;
}

export default function ReviewList({
    reviews,
    currentPage,
    totalPages,
    onPageChange,
    onEdit,
    onDelete,
    showMeal = false,
    currentUserId,
    isLoading = false,
}: ReviewListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                                <div className="h-3 bg-gray-200 rounded w-full" />
                                <div className="h-3 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    No reviews yet
                </h3>
                <p className="text-gray-500">
                    Be the first to share your experience!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Reviews */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        showMeal={showMeal}
                        currentUserId={currentUserId}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first, last, current, and adjacent pages
                            if (
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 1
                            ) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${page === currentPage
                                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                                                : "border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (
                                page === currentPage - 2 ||
                                page === currentPage + 2
                            ) {
                                return (
                                    <span key={page} className="px-2 text-gray-400">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
