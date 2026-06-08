import ContactSection from "@/components/sections/ContactSection.jsx";
import CopyVortexProfileCta from "@/components/sections/CopyVortexProfileCta.jsx";
import ExperienceSection from "@/components/sections/ExperienceSection.jsx";
import Footer from "@/components/Footer.jsx";
import Hero from "@/components/sections/Hero.jsx";
import NichesCarousel from "@/components/sections/NichesCarousel.jsx";
import ShowcaseImageSection from "@/components/sections/ShowcaseImageSection.jsx";

export default function PortfolioHome({ portfolio }) {
  return (
    <>
      <Hero portfolio={portfolio} />
      <NichesCarousel niches={portfolio?.niches || portfolio?.tags?.niches || []} />
      <ExperienceSection portfolio={portfolio} />
      <ShowcaseImageSection />
      <ContactSection portfolio={portfolio} />
      <CopyVortexProfileCta portfolio={portfolio} />
      <Footer portfolio={portfolio} />
    </>
  );
}
