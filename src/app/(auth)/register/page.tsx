import { RegisterForm } from "@/components/auth/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Register | FoodHub",
    description: "Create a new FoodHub account",
}

export default function RegisterPage() {
    return <RegisterForm />
}
