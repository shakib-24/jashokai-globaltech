import Hero from "./_components/sections/Hero";
import TrustIndicators from "./_components/sections/TrustIndicators";
import WhyJashokai from "./_components/sections/WhyJashokai";
import JapaneseCourses from "./_components/sections/JapaneseCourses";
import TeachingMethod from "./_components/sections/TeachingMethod";
import JlptPrep from "./_components/sections/JlptPrep";
import Teachers from "./_components/sections/Teachers";
import UpcomingBatch from "./_components/sections/UpcomingBatch";
import FutureOpportunities from "./_components/sections/FutureOpportunities";
import Faq from "./_components/sections/Faq";
import ContactCta from "./_components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <WhyJashokai />
      <JapaneseCourses />
      <TeachingMethod />
      <JlptPrep />
      <Teachers />
      <UpcomingBatch />
      <FutureOpportunities />
      <Faq />
      <ContactCta />
    </>
  );
}
