"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterInput } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "CUSTOMER" as "CUSTOMER" | "PROVIDER"
        }
    })

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true);
        try {
            await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                callbackURL: "/", // Redirect to home (auto-login enabled in backend)
                // @ts-ignore - Role is supported by backend customization
                role: data.role // Passing role as additional field
            }, {
                onRequest: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    // Loading state reset handled by try-catch or component unmount usually, 
                    // but explicitly setting false here is fine too.
                    setIsLoading(false);
                    toast({
                        title: "Account created!",
                        description: "Your account has been created successfully.",
                    });
                    reset(); // Clear the form
                    router.push("/");
                },
                onError: (ctx: any) => {
                    setIsLoading(false);
                    toast({
                        title: "Error",
                        description: ctx.error.message || "Failed to create account.",
                        variant: "destructive",
                    });
                },
            });
        } catch (error: any) {
            console.error("Registration error:", error);
            setIsLoading(false);
            toast({
                title: "Network Error",
                description: "Failed to connect to the server. Please try again later.",
                variant: "destructive",
            });
        }
    }

    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className={labelClass}>Full Name</label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="jhon@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="role" className={labelClass}>I want to</label>
                        <div className="relative">
                            <select
                                id="role"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...register("role")}
                            >
                                <option value="CUSTOMER">Order Food</option>
                                <option value="PROVIDER">Sell Food</option>
                            </select>
                        </div>
                        {errors.role && (
                            <p className="text-sm text-red-500 font-medium">{errors.role.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 font-medium">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
