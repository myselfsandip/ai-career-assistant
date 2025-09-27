import AboutUs from "@/components/home/AboutUs";
import CallToAction from "@/components/home/CallToAction";
import ContentSection from "@/components/home/ContentSection";
import Faq from "@/components/home/Faq";
import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar"
import PricingSection from "@/components/home/PricingSection";

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
