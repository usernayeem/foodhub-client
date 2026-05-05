import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Clock, CheckCircle, XCircle, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { fetcher } from "@/lib/api";
import { ReviewService } from "@/services/api";
import ReviewForm from "../reviews/ReviewForm";
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

interface OrderCardProps {
    order: Order;
    onRefresh?: () => void;
}

const statusColorMap: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
    [OrderStatus.PLACED]: "default",
    [OrderStatus.PREPARING]: "secondary",
    [OrderStatus.READY]: "outline",
    [OrderStatus.DELIVERED]: "outline",
    [OrderStatus.CANCELLED]: "destructive",
};

const statusIconMap: Record<OrderStatus, React.ReactNode> = {
    [OrderStatus.PLACED]: <Package className="w-4 h-4 ml-2" />,
    [OrderStatus.PREPARING]: <Clock className="w-4 h-4 ml-2" />,
    [OrderStatus.READY]: <CheckCircle className="w-4 h-4 ml-2" />,
    [OrderStatus.DELIVERED]: <Truck className="w-4 h-4 ml-2" />,
    [OrderStatus.CANCELLED]: <XCircle className="w-4 h-4 ml-2" />,
};

export function OrderCard({ order, onRefresh }: OrderCardProps) {
    const { toast } = useToast();
    const [isCancelling, setIsCancelling] = useState(false);
    const [reviewMeal, setReviewMeal] = useState<{ id: string; name: string } | null>(null);

    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleCancel = async () => {
        setIsCancelling(true);
        try {
            await fetcher(`/orders/${order.id}/cancel`, {
                method: "PATCH",
                credentials: "include", // Add credentials
            });
            toast({
                title: "Order Cancelled",
                description: "Your order has been cancelled successfully.",
            });
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error("Cancel order error:", error);
            toast({
                title: "Error",
                description: "Failed to cancel order. It may be too late to cancel.",
                variant: "destructive",
            });
        } finally {
            setIsCancelling(false);
        }
    };

    const handleReview = async (data: { rating: number; comment: string }) => {
        if (!reviewMeal) return;
        try {
            await ReviewService.createReview({
                mealId: reviewMeal.id,
                ...data
            });
            toast({
                title: "Review Submitted",
                description: `Thank you for reviewing ${reviewMeal.name}!`,
            });
            setReviewMeal(null);
            if (onRefresh) onRefresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to submit review.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <CardDescription>
                        {formattedDate}
                    </CardDescription>
                </div>
                <Badge variant={statusColorMap[order.status]} className="flex items-center">
                    {order.status}
                    {statusIconMap[order.status]}
                </Badge>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.quantity}x {item.meal?.name || "Unknown Meal"}</span>
                                    <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                {order.status === OrderStatus.DELIVERED && item.meal && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-7 text-[10px] w-fit px-2 text-primary hover:text-primary hover:bg-primary/10 gap-1"
                                        onClick={() => setReviewMeal({ id: item.mealId, name: item.meal?.name || "" })}
                                    >
                                        <Star className="w-3 h-3 fill-current" />
                                        Review Meal
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            {order.status === OrderStatus.PLACED && (
                <CardFooter className="pt-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                disabled={isCancelling}
                            >
                                {isCancelling ? "Cancelling..." : "Cancel Order"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to cancel this order? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleCancel}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Yes, Cancel Order
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            )}
            {reviewMeal && (
                <ReviewForm 
                    mealName={reviewMeal.name}
                    onCancel={() => setReviewMeal(null)}
                    onSubmit={handleReview}
                />
            )}
        </Card>
    );
}
