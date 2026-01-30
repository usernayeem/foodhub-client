"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zipCode: z.string().min(3, "Zip code is required"),
    country: z.string().min(2, "Country is required"),
    paymentMethod: z.literal("COD"),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
    const { data: session } = authClient.useSession();
    const { toast } = useToast();
    const { clearCart, items, cartTotal } = useCart();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutInput>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: "COD",
        },
    });

    // Populate user details when session is available
    useEffect(() => {
        if (session?.user) {
            setValue("name", session.user.name || "");
            setValue("email", session.user.email || "");
        }
    }, [session, setValue]);

    const onSubmit = async (data: CheckoutInput) => {
        if (items.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items to your cart before checking out.",
                variant: "destructive",
            });
            return;
        }

        // constraint: Single provider per order for now
        const providerId = items[0].providerId;
        const differentProviderItem = items.find(item => item.providerId !== providerId);

        if (differentProviderItem) {
            toast({
                title: "Multiple Providers Detected",
                description: "Currently, we only support orders from a single provider. Please clear your cart and order from one provider at a time.",
                variant: "destructive",
            });
            return;
        }

        try {
            const DELIVERY_FEE = 5.00;
            const payload = {
                providerId: providerId,
                deliveryAddress: `${data.address}, ${data.city}, ${data.zipCode}, ${data.country}`,
                totalAmount: cartTotal + DELIVERY_FEE,
                items: items.map(item => ({
                    mealId: item.mealId,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Important: Send session cookies to backend
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to place order");
            }

            toast({
                title: "Order Placed Successfully!",
                description: "Your order has been received and is being processed.",
            });

            clearCart();
            router.push("/orders"); // Redirect to orders page (to be built next)
        } catch (error: any) {
            console.error("Order placement error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to place order. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
                <CardDescription>Enter your delivery address.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* User Details (Read Only) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                readOnly
                                className="bg-muted"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                readOnly
                                className="bg-muted"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Address Fields */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            placeholder="123 Main St"
                            {...register("address")}
                        />
                        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="New York" {...register("city")} />
                            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" placeholder="10001" {...register("zipCode")} />
                            {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="United States" {...register("country")} />
                        {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                    </div>

                    {/* Payment Method (Fixed) */}
                    <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Input
                            value="Cash on Delivery"
                            readOnly
                            className="bg-muted font-medium"
                        />
                        <input type="hidden" {...register("paymentMethod")} value="COD" />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Placing Order..." : "Place Order"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
