import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import { IconPlane, IconLanguage, IconCode } from "../ui/icons";

const OPPORTUNITIES = [
  {
    icon: IconPlane,
    title: "Study Abroad",
    description: "Guidance for studying overseas, planned as part of our long-term roadmap.",
  },
  {
    icon: IconLanguage,
    title: "Other Languages",
    description: "Language courses beyond Japanese, coming in a future phase.",
  },
  {
    icon: IconCode,
    title: "IT Careers",
    description: "IT skills and career pathways, planned for a future phase.",
  },
];

export default function FutureOpportunities() {
  return (
    <Section id="future-opportunities" background="white" ariaLabel="Future Opportunities">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Our Roadmap"
          title="Future Opportunities"
          description="Languages • Study Abroad • IT Careers — our long-term vision. Today, we focus entirely on Japanese language education."
          align="left"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {OPPORTUNITIES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-dashed border-line bg-offwhite p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy/60">
                  <Icon width={22} height={22} />
                </span>
                <Badge variant="muted">Coming Soon</Badge>
              </div>
              <h3 className="text-base font-semibold text-navy">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
