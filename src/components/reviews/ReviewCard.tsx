"use client";

import { Review } from "@/types";
import StarRating from "../ui/StarRating";
import { Trash2, Edit2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
    review: Review;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: string) => void;
    showMeal?: boolean;
    currentUserId?: string;
}

export default function ReviewCard({
    review,
    onEdit,
    onDelete,
    showMeal = false,
    currentUserId,
}: ReviewCardProps) {
    const isOwner = currentUserId === review.userId;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                        {review.user?.image ? (
                            <img
                                src={review.user.image}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                                {review.user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">
                                {review.user?.name || "Anonymous"}
                            </h4>
                            <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(review.createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>

                        <StarRating rating={review.rating} readonly size="sm" />

                        {review.comment && (
                            <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                                {review.comment}
                            </p>
                        )}

                        {showMeal && review.meal && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                {review.meal.image && (
                                    <img
                                        src={review.meal.image}
                                        alt={review.meal.name}
                                        className="w-8 h-8 rounded object-cover"
                                    />
                                )}
                                <span className="font-medium">{review.meal.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                {isOwner && (onEdit || onDelete) && (
                    <div className="flex items-center gap-2 ml-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(review)}
                                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                aria-label="Edit review"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(review.id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Delete review"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
