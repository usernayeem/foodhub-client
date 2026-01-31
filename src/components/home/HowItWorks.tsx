import { Search, ShoppingCart, Truck } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "1. Search",
            description: "Find your favorite meals from our wide selection of local providers."
        },
        {
            icon: ShoppingCart,
            title: "2. Order",
            description: "Add items to your cart and place your order with just a few clicks."
        },
        {
            icon: Truck,
            title: "3. Enjoy",
            description: "Track your delivery and enjoy hot, delicious food at your doorstep."
        }
    ];

    return (
        <section className="py-16 bg-muted/50 w-full">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Getting your favorite food delivered is as easy as 1-2-3.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
