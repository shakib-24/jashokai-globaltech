import Section from "../ui/Section";
import { IconGraduationCap, IconBookOpen, IconMessagesSquare, IconHeadset } from "../ui/icons";

const ITEMS = [
  {
    icon: IconGraduationCap,
    title: "Qualified Teachers",
    description: "Guided by trained Japanese language instructors.",
  },
  {
    icon: IconBookOpen,
    title: "Structured Curriculum",
    description: "Level-based learning path from N5 through JLPT prep.",
  },
  {
    icon: IconMessagesSquare,
    title: "Practical Japanese",
    description: "Focused on real conversation, not just theory.",
  },
  {
    icon: IconHeadset,
    title: "Student Support",
    description: "Guidance and support throughout your learning journey.",
  },
];

export default function TrustIndicators() {
  return (
    <Section
      background="navy"
      ariaLabel="Why Choose JASHOKAI"
      className="relative overflow-hidden !py-8 sm:!py-10"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 text-white opacity-[0.05]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="0" cy="0" r="60" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r="140" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-gold opacity-[0.06]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative flex flex-col items-center gap-6 sm:gap-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-gold-light sm:text-3xl">
          Why Choose JASHOKAI?
        </h2>

        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {ITEMS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 text-center lg:px-8"
            >
              <Icon width={30} height={30} strokeWidth={1.6} className="text-gold" />
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="max-w-[220px] text-sm leading-relaxed text-white/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
