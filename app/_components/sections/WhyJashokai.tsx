import Image from "next/image";
import Section from "../ui/Section";
import Button from "../ui/Button";

export default function WhyJashokai() {
  return (
    <Section
      id="about"
      background="offwhite"
      ariaLabel="About JASHOKAI"
      className="!py-12 sm:!py-16 lg:!py-20"
    >
      <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-[48fr_52fr] md:gap-12 lg:gap-14">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-navy/5 md:aspect-auto md:h-full md:min-h-[420px]">
          <Image
            src="/images/classroom.png"
            alt="Students learning Japanese in a JASHOKAI GlobalTech classroom"
            fill
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover brightness-110 contrast-105 md:object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              About JASHOKAI
            </span>
            <span className="text-sm font-medium italic text-muted">
              From Jashore, for the world.
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Why Learn With <span className="text-gold">JASHOKAI GlobalTech</span>
          </h2>

          <div className="flex flex-col gap-3 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Most language schools sell a course. We&apos;re building
              something more focused: Japanese taught properly, before we
              promise anything else.
            </p>
            <p>
              JASHOKAI GlobalTech began with a simple idea — students
              deserve structured lessons, measurable progress, clear fees,
              and teachers who explain the language, not just the exam.
            </p>
            <p>
              We started in Jashore with one standard: teach Japanese well
              enough that we can stand behind every lesson we deliver.
            </p>
          </div>

          <p className="border-l-2 border-gold pl-4 text-base font-semibold text-navy sm:text-lg">
            Born in Jashore.{" "}
            <span className="text-gold">Built for the world beyond it.</span>
          </p>

          <div>
            <Button href="#about" variant="primary">
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
