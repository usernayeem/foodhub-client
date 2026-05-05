"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, Instagram, Twitter, Facebook } from "lucide-react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you soon.",
        })

        setIsSubmitting(false)
        const form = e.target as HTMLFormElement
        form.reset()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Get in <span className="text-primary">Touch</span></h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out through our contact details.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="md:col-span-1 space-y-8">
                            <Card className="border-none shadow-none bg-muted/30 rounded-3xl p-6">
                                <CardContent className="p-0 space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-2xl">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Our Office</h3>
                                            <p className="text-muted-foreground">123 Culinary Ave, Suite 500<br />Food City, FC 12345</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-2xl">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Phone</h3>
                                            <p className="text-muted-foreground">+1 (555) 123-4567<br />+1 (555) 765-4321</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-2xl">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Email</h3>
                                            <p className="text-muted-foreground">hello@foodhub.com<br />support@foodhub.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-2xl">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Hours</h3>
                                            <p className="text-muted-foreground">Mon - Sun: 9:00 AM - 11:00 PM</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4 px-2">
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-2">
                            <Card className="rounded-3xl border border-border/50 shadow-xl overflow-hidden">
                                <CardContent className="p-8 md:p-12">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="first-name">First Name</Label>
                                                <Input name="first-name" id="first-name" placeholder="John" className="rounded-xl h-12 bg-muted/30" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last-name">Last Name</Label>
                                                <Input name="last-name" id="last-name" placeholder="Doe" className="rounded-xl h-12 bg-muted/30" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input name="email" id="email" type="email" placeholder="john@example.com" className="rounded-xl h-12 bg-muted/30" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input name="subject" id="subject" placeholder="How can we help?" className="rounded-xl h-12 bg-muted/30" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea name="message" id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px] rounded-xl bg-muted/30 resize-none" required />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full h-14 rounded-2xl text-lg font-bold bg-gradient-to-r from-primary to-orange-600 border-none shadow-lg hover:shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message
                                                    <Send className="h-5 w-5" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
