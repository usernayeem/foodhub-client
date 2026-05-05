import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AppDownloadSection } from "@/components/home/AppDownloadSection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PromoBannerSection } from "@/components/home/PromoBannerSection";
import { TrustSafetySection } from "@/components/home/TrustSafetySection";
import { PartnerSection } from "@/components/home/PartnerSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <FeaturedCategories />
      <PromoBannerSection />
      <HowItWorks />
      <FeaturesSection />
      <ServicesSection />
      <TrustSafetySection />
      <PartnerSection />
      <AppDownloadSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
