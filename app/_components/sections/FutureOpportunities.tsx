import Image from "next/image";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const OPPORTUNITIES = [
  {
    image: "/images/future-opportunities/study-abroad.png",
    phase: "Phase 2 · Coming Soon",
    title: "Study Abroad",
    description: "Guidance for studying in Japan, planned as part of our long-term roadmap.",
    accent: "ocean" as const,
  },
  {
    image: "/images/future-opportunities/other-languages.png",
    phase: "Phase 3 · Coming Soon",
    title: "Other Languages",
    description: "Language courses beyond Japanese, planned for a future phase.",
    accent: "palm" as const,
  },
  {
    image: "/images/future-opportunities/it-careers.png",
    phase: "Phase 4 · Coming Soon",
    title: "IT Careers",
    description: "Practical IT skills and career pathways planned for a future phase.",
    accent: "navy" as const,
  },
];

const badgeAccent = {
  ocean: "bg-white/95 text-red-600",
  palm: "bg-white/95 text-red-600",
  navy: "bg-white/95 text-red-600",
} as const;

const topBorderAccent = {
  ocean: "from-ocean via-gold to-ocean-light",
  palm: "from-palm via-gold to-palm-light",
  navy: "from-navy via-gold to-navy-light",
} as const;

export default function FutureOpportunities() {
  return (
    <Section id="future-opportunities" background="white" ariaLabel="Future Opportunities">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            eyebrow="Our Roadmap"
            title="Future Opportunities"
            description="Languages • Study Abroad • IT Careers — our long-term vision. Today, we focus entirely on Japanese language education."
            align="center"
          />
          <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map(({ image, phase, title, description, accent }) => (
            <div
              key={title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_30px_-12px_rgba(10,31,68,0.18)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-14px_rgba(10,31,68,0.28)]"
            >
              <span
                className={`h-1 w-full shrink-0 bg-gradient-to-r ${topBorderAccent[accent]}`}
              />
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-white">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain object-center"
                />
                <span
                  className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${badgeAccent[accent]}`}
                >
                  {phase}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="text-lg font-semibold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <span className="h-px w-10 bg-gold/50" />
          <p className="text-base font-semibold text-navy">We build step by step.</p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Each service will launch only when we&apos;re ready to deliver it well.
          </p>
        </div>
      </div>
    </Section>
  );
}
