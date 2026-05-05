import Link from "next/link"
import { UtensilsCrossed, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <UtensilsCrossed className="h-6 w-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                                FoodHub
                            </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-xs">
                            Connecting people with delicious food from local providers. Your favorite meals, delivered with care.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="bg-muted p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="bg-muted p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="bg-muted p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/meals" className="text-muted-foreground hover:text-primary transition-colors">Meals</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Support</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span>123 Culinary Ave, Suite 500<br />Food City, FC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>hello@foodhub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
