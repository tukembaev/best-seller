import AboutAssortment from "@/components/about/AboutAssortment";
import AboutLocation from "@/components/about/AboutLocation";

import HeroAbout from "@/components/about/HeroAbout";
import OurSpecs from "@/components/shared/OurSpec";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroAbout />
      <AboutAssortment />
      <AboutLocation />
      <OurSpecs />
    </div>
  );
}