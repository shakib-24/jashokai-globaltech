import type { Metadata } from "next";
import Link from "next/link";
import Section from "../_components/ui/Section";
import SectionHeading from "../_components/ui/SectionHeading";
import Badge from "../_components/ui/Badge";
import { IconGraduationCap, IconBriefcase, IconArrowRight } from "../_components/ui/icons";

export const metadata: Metadata = {
  title: "Apply | JASHOKAI GlobalTech",
  description:
    "Choose your application path at JASHOKAI GlobalTech — Japanese language courses or SSW Job / Visa application.",
};

export default function ApplyPage() {
  return (
    <Section background="offwhite" ariaLabel="Apply">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <SectionHeading
          eyebrow="Get Started"
          title="Choose Your Application"
          description="Select the application path that matches your goal. You can always come back and start the other one later."
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Card 1 — Japanese Course Application (disabled) */}
        <div
          aria-disabled="true"
          className="relative flex flex-col gap-5 rounded-2xl border border-line bg-white p-8 opacity-70 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
              <IconGraduationCap width={24} height={24} className="text-navy/50" />
            </span>
            <Badge variant="muted">Coming Soon</Badge>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl font-semibold text-navy/80">
              Japanese Course Application
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Apply for Japanese language courses at JASHOKAI GlobalTech.
            </p>
          </div>

          <span className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-navy/15 px-6 text-base font-semibold text-navy/40">
            Coming Soon
          </span>
        </div>

        {/* Card 2 — SSW Job / Visa Application (active) */}
        <div className="flex flex-col gap-5 rounded-2xl border border-gold/30 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(10,31,68,0.35)] transition-shadow duration-200 hover:shadow-[0_24px_60px_-28px_rgba(10,31,68,0.4)]">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
              <IconBriefcase width={24} height={24} className="text-gold" />
            </span>
            <Badge variant="gold">Open</Badge>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl font-semibold text-navy">
              SSW Job / Visa Application
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Create your applicant profile and prepare your Japanese resume
              for SSW opportunities.
            </p>
          </div>

          <Link
            href="/apply/ssw"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 text-base font-semibold text-navy transition-colors duration-150 hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Start Application
            <IconArrowRight width={18} height={18} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
