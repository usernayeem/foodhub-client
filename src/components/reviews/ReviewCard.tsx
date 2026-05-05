"use client";

import { Review } from "@/types";
import StarRating from "../ui/StarRating";
import { Trash2, Edit2, MessageCircle } from "lucide-react";
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
        <div className="group relative bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Top accent line for glass effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                        {review.user?.image ? (
                            <div className="relative">
                                <img
                                    src={review.user.image}
                                    alt={review.user.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-white">
                                    <MessageCircle className="w-2 h-2 text-white fill-current" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                                {review.user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                            <h4 className="font-bold text-gray-900 truncate">
                                {review.user?.name || "Anonymous User"}
                            </h4>
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                {formatDistanceToNow(new Date(review.createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <StarRating rating={review.rating} readonly size="sm" />
                            <span className="text-xs font-bold text-orange-500">{review.rating.toFixed(1)}</span>
                        </div>

                        {review.comment && (
                            <p className="text-gray-700 text-sm leading-relaxed bg-muted/30 p-3 rounded-xl border border-muted/50 italic">
                                &quot;{review.comment}&quot;
                            </p>
                        )}

                        {showMeal && review.meal && (
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-full border border-primary/10 transition-colors">
                                {review.meal.image && (
                                    <img
                                        src={review.meal.image}
                                        alt={review.meal.name}
                                        className="w-5 h-5 rounded-md object-cover"
                                    />
                                )}
                                <span className="text-[11px] font-bold text-primary uppercase tracking-tight">Ordered {review.meal.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                {isOwner && (onEdit || onDelete) && (
                    <div className="flex flex-col gap-2 ml-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(review)}
                                className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200"
                                aria-label="Edit review"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(review.id)}
                                className="p-2.5 text-gray-400 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
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
