"use client"

import { Zap, ShieldCheck, CreditCard, Clock } from "lucide-react"

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Super Fast Delivery",
    description: "Get your food delivered to your doorstep in 30 minutes or less. We prioritize speed and freshness."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Best Quality Food",
    description: "We partner with top-rated restaurants to ensure every meal meets our high standards of quality."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Secure Payments",
    description: "Multiple payment options available including credit cards, digital wallets, and cash on delivery."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Availability",
    description: "Midnight cravings? Early breakfast? We are available around the clock to serve your needs."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why Choose FoodHub?</h2>
          <p className="text-muted-foreground text-lg">
            We go beyond just delivery. We provide an experience that combines speed, quality, and convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
