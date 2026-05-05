"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Simulate API call
    setIsSubscribed(true)
    toast.success("Subscribed successfully!")
    setEmail("")
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-secondary rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden text-center border border-border/50 shadow-sm">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">Stay Hungry for More!</h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Subscribe to our newsletter and get <span className="text-primary font-black underline decoration-primary/30">20% OFF</span> your first order.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center mt-12 bg-background p-1.5 rounded-full border border-border shadow-sm max-w-2xl mx-auto focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all duration-300">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-6 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-10 rounded-full font-black text-lg transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Join Now <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">You're on the list!</h3>
                <p className="text-muted-foreground">Check your inbox for your 20% discount code.</p>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground/60">We promise not to spam. You can unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
