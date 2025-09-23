import AboutUs from "@/components/landing/AboutUs";
import CallToAction from "@/components/landing/CallToAction";
import ContentSection from "@/components/landing/ContentSection";
import Faq from "@/components/landing/Faq";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FooterSection from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar"
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-2">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ContentSection />
      <CallToAction />
      <PricingSection />
      <AboutUs />
      <Faq />
      <FooterSection />
    </main>
  );
}
