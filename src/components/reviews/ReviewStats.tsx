"use client";

import StarRating from "../ui/StarRating";

interface ReviewStatsProps {
    averageRating: number;
    totalReviews: number;
    size?: "sm" | "md" | "lg";
}

export default function ReviewStats({
    averageRating,
    totalReviews,
    size = "md",
}: ReviewStatsProps) {
    const textSizes = {
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-4xl",
    };

    const starSizes = {
        sm: "sm" as const,
        md: "md" as const,
        lg: "lg" as const,
    };

    return (
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center gap-6">
                {/* Average Rating */}
                <div className="text-center">
                    <div
                        className={`${textSizes[size]} font-bold text-gray-900 mb-1`}
                    >
                        {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                    </div>
                    <StarRating rating={averageRating} readonly size={starSizes[size]} />
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-300" />

                {/* Total Reviews */}
                <div>
                    <div className="text-3xl font-bold text-gray-900">
                        {totalReviews}
                    </div>
                    <div className="text-sm text-gray-600">
                        {totalReviews === 1 ? "Review" : "Reviews"}
                    </div>
                </div>
            </div>
        </div>
    );
}
