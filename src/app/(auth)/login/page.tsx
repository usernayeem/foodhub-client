import { LoginForm } from "@/components/auth/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login | FoodHub",
    description: "Login to your FoodHub account",
}

export default function LoginPage() {
    return <LoginForm />
}
