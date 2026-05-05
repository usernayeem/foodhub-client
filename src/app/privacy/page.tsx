import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Privacy <span className="text-primary">Policy</span></h1>
                    <p className="text-muted-foreground text-lg">Last updated: May 5, 2026</p>
                </div>

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-8 md:p-12 shadow-xl">
                    <div className="space-y-12">
                         <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We collect information that you provide to us directly, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, and delivery address.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Information</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use your information to provide and improve our services, process your orders, communicate with you, and personalize your experience. We may also use your information for marketing purposes with your consent.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Cookies and Tracking</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Rights</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your data in certain circumstances.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Third-Party Services</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                We may share your information with third-party service providers who assist us in operating our business and providing our services, such as payment processors and delivery partners.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
