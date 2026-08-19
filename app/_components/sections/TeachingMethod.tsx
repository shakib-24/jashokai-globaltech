import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { IconChat, IconUsers, IconMic, IconClipboard } from "../ui/icons";

const METHODS = [
  {
    icon: IconChat,
    title: "Communicative Approach",
    description: "Learning centered on using Japanese, not just studying about it.",
  },
  {
    icon: IconUsers,
    title: "Interactive Classes",
    description: "Active participation through pair work, discussion, and practice.",
  },
  {
    icon: IconMic,
    title: "Listening & Speaking Focus",
    description: "Strong emphasis on the skills you'll actually use in conversation.",
  },
  {
    icon: IconClipboard,
    title: "Regular Tests & Feedback",
    description: "Consistent assessment so progress stays visible and on track.",
  },
];

export default function TeachingMethod() {
  return (
    <Section background="navy" ariaLabel="Teaching Method">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="How We Teach"
          title="Our Teaching Method"
          description="A practical, communication-focused approach to learning Japanese."
          align="center"
          light
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-light">
                <Icon width={22} height={22} />
              </span>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
