import ContactSection from "@/components/sections/ContactSection.jsx";
import ExperienceSection from "@/components/sections/ExperienceSection.jsx";
import Hero from "@/components/sections/Hero.jsx";
import NichesCarousel from "@/components/sections/NichesCarousel.jsx";
import WorksSection from "@/components/sections/WorksSection.jsx";

export default function PortfolioHome({ portfolio, locale }) {
  return (
    <>
      <Hero portfolio={portfolio} locale={locale} />
      <NichesCarousel niches={portfolio?.niches || portfolio?.tags?.niches || []} locale={locale} />
      <WorksSection portfolio={portfolio} locale={locale} />
      <ExperienceSection portfolio={portfolio} />
      <ContactSection portfolio={portfolio} locale={locale} />
    </>
  );
}

