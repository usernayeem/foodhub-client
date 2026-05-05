"use client"

import Link from "next/link"
import { Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromoBannerSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Promo 1 */}
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-orange-500 text-white p-10 md:p-16 flex flex-col justify-between h-[450px]">
             <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform duration-500 opacity-20">
                <Tag className="w-48 h-48 rotate-12" />
             </div>
             
             <div className="relative z-10 space-y-6 max-w-sm">
                <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md font-bold text-sm tracking-widest uppercase">
                  Flash Deal
                </div>
                <h3 className="text-4xl md:text-5xl font-black leading-tight">
                  Flat 50% OFF <br /> <span className="text-orange-200">On All Pizzas!</span>
                </h3>
                <p className="text-lg text-orange-50/80">
                  Use code <span className="font-bold text-white">PIZZALOVER</span> at checkout. Valid until midnight tonight.
                </p>
                <Button asChild variant="secondary" size="lg" className="rounded-full px-8 h-14 text-orange-600 font-bold text-lg hover:bg-white transition-colors group">
                  <Link href="/meals">
                    Claim Offer <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
             </div>
          </div>

          {/* Promo 2 */}
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-indigo-600 text-white p-10 md:p-16 flex flex-col justify-between h-[450px]">
             <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform duration-500 opacity-20">
                <Tag className="w-48 h-48 -rotate-12" />
             </div>
             
             <div className="relative z-10 space-y-6 max-w-sm">
                <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md font-bold text-sm tracking-widest uppercase">
                  Weekend Special
                </div>
                <h3 className="text-4xl md:text-5xl font-black leading-tight">
                  Free Delivery <br /> <span className="text-indigo-200">All Weekend.</span>
                </h3>
                <p className="text-lg text-indigo-50/80">
                  No minimum order value required. Just order and we'll bring it for free!
                </p>
                <Button asChild variant="secondary" size="lg" className="rounded-full px-8 h-14 text-indigo-600 font-bold text-lg hover:bg-white transition-colors group">
                  <Link href="/meals">
                    Order Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
