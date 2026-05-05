"use client"

import { useState } from "react"
import { ChevronDown, Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our categories or restaurants, add items to your cart, and proceed to checkout. You can pay online or choose cash on delivery."
  },
  {
    question: "What are the delivery charges?",
    answer: "Delivery charges vary depending on your distance from the restaurant and current demand. You'll see the exact charge before you finalize your order."
  },
  {
    question: "Can I track my order in real-time?",
    answer: "Yes! Once your order is confirmed, you can track the status and the location of your delivery partner through our app or website."
  },
  {
    question: "Do you offer contact-less delivery?",
    answer: "Absolutely. You can select 'Contact-less Delivery' in the checkout options, and our partner will leave the food at your doorstep."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about FoodHub.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border rounded-2xl bg-card overflow-hidden transition-all duration-200"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg font-bold">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="p-6 pt-0 text-muted-foreground text-lg leading-relaxed border-t">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
