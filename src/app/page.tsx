import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <FeaturedCategories />

      <HowItWorks />

      {/* Testimonial / How it works could go here */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Why FoodHub?</h2>
          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full text-4xl">⚡</div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground">Hot food to your door in 30 mins or less.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full text-4xl">👨‍🍳</div>
              <h3 className="text-xl font-bold">Expert Chefs</h3>
              <p className="text-muted-foreground">Dishes crafted by top local restaurants.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full text-4xl">💰</div>
              <h3 className="text-xl font-bold">Best Prices</h3>
              <p className="text-muted-foreground">Affordable meals without compromising quality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
