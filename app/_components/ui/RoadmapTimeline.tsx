import type { ComponentType, SVGProps } from "react";

export default function RoadmapTimeline({
  steps,
}: {
  steps: readonly { icon: ComponentType<SVGProps<SVGSVGElement>>; title: string }[];
}) {
  return (
    <ol className="relative mx-auto flex max-w-xl flex-col gap-8 sm:gap-9">
      <span
        aria-hidden
        className="absolute top-3 bottom-3 left-[19px] w-px bg-gold/30 sm:left-[23px]"
      />
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === steps.length - 1;
        return (
          <li key={step.title} className="relative flex items-center gap-4 sm:gap-5">
            <span
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12 ${
                isLast
                  ? "border-gold bg-gold text-navy"
                  : "border-gold/60 bg-white text-gold"
              }`}
            >
              <Icon width={18} height={18} strokeWidth={2} />
            </span>
            <span className="text-base font-semibold text-navy sm:text-lg">{step.title}</span>
          </li>
        );
      })}
    </ol>
  );
}
