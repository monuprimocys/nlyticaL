"use client";

import HomeHeroSection from "./componets/homesection/HomeHeroSection";
import HomeSectionSerachBox from "./componets/homesection/HomeSectionSerachBox";
import Section4 from "./componets/homesection/Section4";
import Services from "./componets/homesection/ServicesSection3/Services";
import Section6 from "./componets/homesection/Section6";
import Section7 from "./componets/homesection/Section7";
import Section8 from "./componets/homesection/Section8/Section8";
import Section9 from "./componets/homesection/Section9/Section9";
import SponsorStores from "./componets/homesection/SponsorStores/SponsorStores";
import NewCities from "./componets/homesection/NewCities/NewCities";

export default function Home() {
  return (
    <div className=" h-auto w-full">
      <HomeHeroSection />
      <HomeSectionSerachBox />
      <Services />
      <Section4 />
      <SponsorStores />
      <NewCities />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
    </div>
  );
}
