"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Clock, ChevronRight } from "lucide-react"
import styles from "./Hero.module.css"

const sliderData = [
  {
    image: "/images/hero/burger.png",
    title: "The Ultimate Burger Experience",
    tagline: "Flame-Grilled Perfection",
  },
  {
    image: "/images/hero/sushi.png",
    title: "Freshness in Every Bite",
    tagline: "Authentic Japanese Craft",
  },
  {
    image: "/images/hero/pasta.png",
    title: "Handmade Italian Classics",
    tagline: "Rustic & Comforting",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.heroContainer}>
      <div className={styles.container}>
        {/* Content Side */}
        <div className={styles.content}>
          <span className={styles.tagline}>Welcome to FoodHub</span>
          <h1 className={styles.title}>
            Delicious Food, <br />
            <span className="text-primary">Delivered To You</span>
          </h1>
          <p className={styles.description}>
            Order from the best local restaurants with easy, on-demand delivery. 
            Fresh, fast, and right to your doorstep.
          </p>
          
          <div className={styles.actions}>
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-semibold group">
              <Link href="/meals">
                Order Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
              <Link href="/restaurants">Explore Restaurants</Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex -space-x-3">
              {[2, 5, 8, 14].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    alt="User" 
                    width={40} 
                    height={40} 
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1">4.9/5</span>
              </div>
              <p className="text-muted-foreground">from 2k+ reviews</p>
            </div>
          </div>
        </div>

        {/* Visual Side */}
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            {sliderData.map((slide, index) => (
              <Image
                key={index}
                src={slide.image}
                alt={slide.title}
                fill
                className={`${styles.heroImage} ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                priority={index === 0}
                style={{ transition: "opacity 0.8s ease-in-out, transform 1.2s ease-out" }}
              />
            ))}
            
            {/* Floating Elements */}
            <div className={`${styles.floatingElement} ${styles.floating1}`}>
              <div className="p-2 bg-green-500/10 rounded-full text-green-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Delivery</p>
                <p className="text-sm font-bold">30 mins or free</p>
              </div>
            </div>

            <div className={`${styles.floatingElement} ${styles.floating2}`}>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Top Rated</p>
                <p className="text-sm font-bold">Best local food</p>
              </div>
            </div>
          </div>

          <div className={styles.sliderControls}>
            {sliderData.map((_, index) => (
              <div
                key={index}
                className={`${styles.sliderDot} ${index === currentSlide ? styles.sliderDotActive : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visual Flow Indicator */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  )
}
