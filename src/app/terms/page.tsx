import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Terms of <span className="text-primary">Service</span></h1>
                    <p className="text-muted-foreground text-lg">Last updated: May 5, 2026</p>
                </div>

                <div className="rounded-3xl border border-border/50 bg-muted/20 p-8 md:p-12 shadow-xl">
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Welcome to FoodHub. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Use of Service</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You must be at least 18 years old or the age of majority in your jurisdiction to use our services. You agree to provide accurate, current, and complete information during the registration process and to keep your account information up to date.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All content on this website, including text, graphics, logos, images, and software, is the property of FoodHub and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. User Accounts</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                FoodHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.
                            </p>
                        </section>

                        <Separator className="bg-border/50" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on this website. Your continued use of our services following the posting of changes constitutes your acceptance of such changes.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
