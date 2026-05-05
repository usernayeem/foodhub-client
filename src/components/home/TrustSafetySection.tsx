"use client"

import { ShieldCheck, Truck, Clock, Heart } from "lucide-react"

export function TrustSafetySection() {
  const items = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "100% Safe Payments",
      description: "Your transactions are protected by industry-leading encryption and security protocols."
    },
    {
      icon: <Truck className="w-10 h-10 text-blue-500" />,
      title: "Hygienic Delivery",
      description: "Our delivery partners follow strict safety and hygiene guidelines for every order."
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      title: "Real-time Support",
      description: "Our dedicated support team is available 24/7 to help you with any queries or concerns."
    },
    {
      icon: <Heart className="w-10 h-10 text-red-500" />,
      title: "Quality Guaranteed",
      description: "We only partner with restaurants that maintain the highest standards of food preparation."
    }
  ]

  return (
    <section className="py-24 bg-background border-y">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Your Safety is <br /> <span className="text-primary">Our Priority.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              We take every measure to ensure your food is prepared, handled, and delivered with the utmost care and security.
            </p>
            <div className="pt-4">
               <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 max-w-md">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">✓</div>
                  <p className="font-medium">Verified by Global Food Safety Standards</p>
               </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {items.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/5 border hover:bg-background hover:shadow-xl transition-all duration-300">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
