import ContactSection from "@/components/sections/ContactSection.jsx";
import CopyVortexProfileCta from "@/components/sections/CopyVortexProfileCta.jsx";
import ExperienceSection from "@/components/sections/ExperienceSection.jsx";
import Footer from "@/components/Footer.jsx";
import Hero from "@/components/sections/Hero.jsx";
import NichesCarousel from "@/components/sections/NichesCarousel.jsx";
import ShowcaseImageSection from "@/components/sections/ShowcaseImageSection.jsx";

export default function PortfolioHome({ portfolio, locale }) {
  return (
    <>
      <Hero portfolio={portfolio} locale={locale} />
      <NichesCarousel niches={portfolio?.niches || portfolio?.tags?.niches || []} locale={locale} />
      <ExperienceSection portfolio={portfolio} />
      <ShowcaseImageSection />
      <ContactSection portfolio={portfolio} locale={locale} />
      <CopyVortexProfileCta portfolio={portfolio} locale={locale} />
      <Footer portfolio={portfolio} />
    </>
  );
}
