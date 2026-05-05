"use client"

import { Store, Bike, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PartnerSection() {
  const partners = [
    {
      icon: <Store className="w-12 h-12" />,
      title: "For Restaurants",
      description: "Reach more customers and grow your business by partnering with FoodHub.",
      cta: "Register Restaurant"
    },
    {
      icon: <Bike className="w-12 h-12" />,
      title: "For Riders",
      description: "Earn competitive pay and enjoy flexible hours by delivering with us.",
      cta: "Become a Rider"
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "For Corporate",
      description: "Get customized meal solutions for your office and corporate events.",
      cta: "Join as Partner"
    }
  ]

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Grow with FoodHub</h2>
          <p className="text-xl text-muted-foreground">
            We are more than just a delivery service. We are a platform for growth and opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((p, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-card border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {p.description}
              </p>
              <Button variant="outline" className="mt-auto rounded-full px-8 h-12 font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                {p.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
