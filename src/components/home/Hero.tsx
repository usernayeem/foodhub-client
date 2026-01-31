import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Delicious Food, <span className="text-primary">Delivered To You</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Order from the best local restaurants with easy, on-demand delivery. Fresh, fast, and right to your doorstep.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button asChild size="lg">
                            <Link href="/meals">Browse Meals</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/register">Join as Provider</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
