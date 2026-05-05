import Image from "next/image"
import { CheckCircle2, Users, Heart, Zap, ShieldCheck, Globe } from "lucide-react"

const values = [
    {
        title: "Quality First",
        description: "We partner only with the best restaurants that maintain the highest standards of food safety and quality.",
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    },
    {
        title: "Speedy Delivery",
        description: "Our optimized logistics ensure your food arrives hot and fresh, exactly when you expect it.",
        icon: <Zap className="h-8 w-8 text-primary" />,
    },
    {
        title: "Customer Obsessed",
        description: "Your satisfaction is our top priority. Our support team is available 24/7 to help you.",
        icon: <Heart className="h-8 w-8 text-primary" />,
    },
    {
        title: "Global Flavors",
        description: "We bring cuisines from all around the world right to your neighborhood.",
        icon: <Globe className="h-8 w-8 text-primary" />,
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
                    alt="About Us Hero"
                    fill
                    className="object-cover brightness-[0.3]"
                    priority
                />
                <div className="container relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        We Redefine <span className="text-primary">Dining</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        FoodHub is more than just a delivery service. We are a bridge between the world's finest culinary artists and your dining table.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story Started with a Simple Craving</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Founded in 2023, FoodHub began with a simple idea: why should great food be hard to find? Our founders, a group of foodies and tech enthusiasts, wanted to create a platform that celebrates local flavors while providing a seamless ordering experience.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                What started in a small kitchen has now grown into a community of thousands of restaurants and millions of happy diners. We've stayed true to our roots, focusing on quality, community, and the joy of a good meal.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                    <div className="text-3xl font-bold text-primary">500+</div>
                                    <div className="text-sm text-muted-foreground">Partner Restaurants</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                    <div className="text-3xl font-bold text-primary">10k+</div>
                                    <div className="text-sm text-muted-foreground">Daily Deliveries</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1613274554329-70f997f5789f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Our Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Values We Live By</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our principles guide every decision we make, from the restaurants we partner with to the technology we build.
                    </p>
                </div>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-background p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-2 duration-300">
                                <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
