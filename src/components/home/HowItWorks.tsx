import { Search, ShoppingCart, Truck, ChevronRight } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Browse & Search",
            description: "Discover the best meals from top-rated local restaurants in your area."
        },
        {
            icon: ShoppingCart,
            title: "Easy Ordering",
            description: "Select your favorites, customize your meal, and checkout in seconds."
        },
        {
            icon: Truck,
            title: "Express Delivery",
            description: "Track your food in real-time and enjoy it hot at your doorstep."
        }
    ];

    return (
        <section className="py-24 bg-background w-full relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-2">
                        Step by Step
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">How FoodHub Works</h2>
                    <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
                        Getting your favorite food delivered is now easier than ever. Just follow these simple steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-dashed bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"></div>
                    
                    <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 bg-card rounded-[2rem] shadow-xl border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                                        <step.icon className="w-10 h-10" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-background">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed px-4">
                                    {step.description}
                                </p>
                                
                                {index < steps.length - 1 && (
                                    <div className="md:hidden mt-8 text-primary/30">
                                        <ChevronRight className="w-8 h-8 rotate-90" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
