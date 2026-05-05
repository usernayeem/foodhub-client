"use client";

import { useEffect, useState } from "react";
import { Review, Meal } from "@/types";
import { fetcher } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, Star, ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewStats from "@/components/reviews/ReviewStats";
import Link from "next/link";

export default function ProviderReviewsPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const { toast } = useToast();
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const fetchAllProviderReviews = async () => {
        setIsLoading(true);
        try {
            // 1. Get Provider Profile to get providerId
            const profile = await fetcher<{ data: any }>("/provider/profile/me", {
                credentials: "include"
            });
            const providerId = profile.data.id;

            // 2. Get all meals for this provider (limit to 100 for simplicity)
            const mealsRes = await fetcher<{ data: any[] }>("/meals?providerId=" + providerId + "&limit=100", {
                credentials: "include"
            });
            const meals = mealsRes.data;

            // 3. For each meal with reviews, fetch them
            const allReviews: Review[] = [];
            const reviewPromises = meals
                .filter(meal => meal._count?.reviews > 0)
                .map(meal => 
                    fetcher<{ data: Review[] }>("/reviews/meals/" + meal.id + "?limit=50", {
                        credentials: "include"
                    }).then(res => {
                        // Attach meal info to each review since the endpoint might not include full meal object
                        return res.data.map(r => ({ ...r, meal }));
                    })
                );

            const reviewsResults = await Promise.all(reviewPromises);
            reviewsResults.forEach(mealReviews => {
                allReviews.push(...mealReviews);
            });

            // 4. Sort by date (descending)
            allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setReviews(allReviews);
            setTotalCount(allReviews.length);
            
            if (allReviews.length > 0) {
                const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
                setAverageRating(sum / allReviews.length);
            }
        } catch (error) {
            console.error("Failed to fetch provider reviews:", error);
            toast({
                title: "Error",
                description: "Failed to load reviews.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending) {
            const user = session?.user as any;
            if (!session || user?.role !== "PROVIDER") {
                router.push("/login?redirect=/provider/reviews");
            } else {
                fetchAllProviderReviews();
            }
        }
    }, [session, isPending]);

    if (isPending || (isLoading && reviews.length === 0)) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 md:p-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Link href="/provider" className="inline-flex items-center text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                            Customer <span className="text-primary">Reviews</span>
                        </h1>
                        <p className="text-gray-400 max-w-md text-lg">
                            See what your customers are saying about your meals and service.
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
                {reviews.length === 0 && !isLoading ? (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <h3 className="text-xl font-bold text-gray-400">No reviews yet</h3>
                        <p className="text-muted-foreground">Reviews will appear here once customers start rating your meals.</p>
                    </div>
                ) : (
                    <ReviewList 
                        reviews={reviews}
                        currentPage={1}
                        totalPages={1}
                        onPageChange={() => {}} // Aggregated list doesn't easily support pagination without more logic
                        showMeal={true}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
