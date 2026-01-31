"use client";

import { useState } from "react";
import StarRating from "../ui/StarRating";
import { X } from "lucide-react";

interface ReviewFormProps {
    onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
    onCancel: () => void;
    initialData?: {
        rating: number;
        comment: string;
    };
    mealName?: string;
    isEdit?: boolean;
}

export default function ReviewForm({
    onSubmit,
    onCancel,
    initialData,
    mealName,
    isEdit = false,
}: ReviewFormProps) {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [comment, setComment] = useState(initialData?.comment || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({ rating, comment });
            onCancel();
        } catch (err: any) {
            setError(err.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isEdit ? "Edit Review" : "Write a Review"}
                        </h2>
                        {mealName && (
                            <p className="text-sm text-gray-600 mt-1">{mealName}</p>
                        )}
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rating <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <StarRating
                                rating={rating}
                                onRatingChange={setRating}
                                size="lg"
                            />
                            {rating > 0 && (
                                <span className="text-sm text-gray-600 ml-2">
                                    {rating} {rating === 1 ? "star" : "stars"}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label
                            htmlFor="comment"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Your Review (Optional)
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this meal..."
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {comment.length} characters
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? "Submitting..." : isEdit ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
