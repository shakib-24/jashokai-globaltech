import type { Metadata } from "next";
import Section from "../../_components/ui/Section";
import SectionHeading from "../../_components/ui/SectionHeading";
import { ApplicationProvider } from "./_context/ApplicationContext";
import Wizard from "./_components/Wizard";

export const metadata: Metadata = {
  title: "SSW Job / Visa Application | JASHOKAI GlobalTech",
  description:
    "Create your applicant profile and prepare your Japanese resume for SSW opportunities with JASHOKAI GlobalTech.",
};

export default function SSWApplicationPage() {
  return (
    <Section background="offwhite" ariaLabel="SSW Job / Visa Application">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="SSW Job / Visa Application"
          title="Build Your Applicant Profile"
          description="Complete each step below. Your progress is saved automatically as you go."
          align="left"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ApplicationProvider>
          <Wizard />
        </ApplicationProvider>
      </div>
    </Section>
  );
}
