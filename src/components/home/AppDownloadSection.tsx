"use client"

import Image from "next/image"
import { Apple, PlayCircle } from "lucide-react"

export function AppDownloadSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border border-primary/10">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1]">
              Food is better when it's <span className="text-primary underline decoration-primary/30">Just a Tap Away.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Download the FoodHub app to get exclusive discounts, track your order in real-time, and discover new restaurants around you.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors">
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-60 leading-none">Download on the</p>
                  <p className="text-lg font-bold leading-none mt-1">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors">
                <PlayCircle className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-60 leading-none">Get it on</p>
                  <p className="text-lg font-bold leading-none mt-1">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-md h-[400px] md:h-[600px]">
             {/* Simple mockup visual using overlapping images or shapes */}
             <img src="./mobile-mockup.png" alt="Mobile App Mockup" />
             {/* Floating elements */}
             <div className="absolute top-20 right-0 p-4 bg-card rounded-2xl shadow-xl border border-primary/10 animate-bounce">
                🍔 Delicious!
             </div>
             <div className="absolute bottom-20 left-0 p-4 bg-card rounded-2xl shadow-xl border border-primary/10 animate-pulse">
                🚀 Faster Delivery
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
