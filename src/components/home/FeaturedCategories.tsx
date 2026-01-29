import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories } from "@/services/categories"

export async function FeaturedCategories() {
    const categories = await getCategories();

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Explore Categories
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Find exactly what you are craving from our diverse selection of cuisines.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/meals?category=${category.slug}`} className="group basis-1/3 md:basis-1/4 lg:basis-1/6 min-w-[140px] max-w-[200px]">
                            <Card className="h-full transition-colors hover:bg-primary/5 border-none shadow-sm hover:shadow-md aspect-square">
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-4 h-full">
                                    <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                                        {category.icon}
                                    </span>
                                    <span className="font-medium text-sm md:text-base whitespace-nowrap">
                                        {category.name}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
