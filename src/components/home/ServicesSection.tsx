"use client"

import { Truck, UtensilsCrossed, CalendarDays, ShoppingBag } from "lucide-react"

const services = [
  {
    icon: <Truck className="w-10 h-10" />,
    title: "Fast Delivery",
    description: "Reliable delivery in under 30 minutes, keeping your food hot and fresh."
  },
  {
    icon: <UtensilsCrossed className="w-10 h-10" />,
    title: "Dine-In Booking",
    description: "Reserve your table at top restaurants ahead of time via our app."
  },
  {
    icon: <CalendarDays className="w-10 h-10" />,
    title: "Event Catering",
    description: "Professional catering services for weddings, parties, and corporate events."
  },
  {
    icon: <ShoppingBag className="w-10 h-10" />,
    title: "Bulk Orders",
    description: "Special discounts and dedicated support for large group or office orders."
  }
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase">
              Our Services
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1]">
              More than just <span className="text-primary">Delivery.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer a wide range of services to make your food experience seamless and enjoyable, whether you're at home, at work, or planning an event.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {services.map((s, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-card border shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                 alt="Gourmet Food" 
                 className="w-full h-[600px] object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                 <div className="text-white">
                   <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Premium Experience</p>
                   <h3 className="text-3xl font-bold">Bringing the Restaurant <br /> Home to You</h3>
                 </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
