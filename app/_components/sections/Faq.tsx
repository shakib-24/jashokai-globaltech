"use client";

import { useState } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { IconPlus, IconMinus } from "../ui/icons";

const FAQS = [
  {
    question: "What does JASHOKAI GlobalTech currently offer?",
    answer:
      "Right now, we offer professional Japanese language education only — from N5 through JLPT and JFT-Basic preparation. Study Abroad, other languages, and IT careers are part of our future roadmap.",
  },
  {
    question: "Do I need prior Japanese knowledge to join N5?",
    answer:
      "No. N5 is designed for complete beginners and starts with Hiragana and Katakana before moving into grammar and vocabulary.",
  },
  {
    question: "What's the difference between N5 and N4?",
    answer:
      "N5 builds your foundation — writing systems, basic grammar, and core vocabulary. N4 expands on that with intermediate grammar, wider vocabulary, and JLPT-focused practice.",
  },
  {
    question: "Do you guarantee a JLPT pass or a job in Japan?",
    answer:
      "No. We do not offer pass guarantees, visa guarantees, or job guarantees. Our focus is on genuine, structured skill-building through qualified teaching and consistent practice.",
  },
  {
    question: "Is Study Abroad or IT Careers available now?",
    answer:
      "Not yet. These are future opportunities on our roadmap. Our only active service today is Japanese language education.",
  },
  {
    question: "How do I get started?",
    answer:
      "Reach out to us and we'll help you find the right course to start with.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" background="offwhite" ariaLabel="Frequently Asked Questions">
      <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you may want to know before getting started."
          align="center"
        />

        <div className="flex flex-col gap-3 sm:gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-200 ${
                  isOpen ? "border-gold/40 shadow-md" : "border-line hover:border-gold/40"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                  >
                    <span className="w-6 shrink-0 text-sm font-bold tabular-nums text-gold sm:w-7 sm:text-base">
                      {number}
                    </span>
                    <span
                      className={`flex-1 text-sm font-bold leading-snug transition-colors duration-200 sm:text-base ${
                        isOpen ? "text-gold" : "text-navy"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        isOpen ? "border-gold bg-gold text-white" : "border-line bg-white text-navy/60"
                      }`}
                    >
                      {isOpen ? <IconMinus width={16} height={16} /> : <IconPlus width={16} height={16} />}
                    </span>
                  </button>
                </h3>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                      className="flex gap-3 px-5 pb-5 sm:gap-4 sm:px-6 sm:pb-6"
                    >
                      <span className="w-6 shrink-0 sm:w-7" />
                      <div className="flex-1 rounded-r-md border-l-2 border-gold/50 bg-gold/5 py-3 pl-4 pr-3">
                        <p className="text-sm leading-relaxed text-muted sm:text-base">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
