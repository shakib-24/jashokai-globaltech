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
      "Book a free consultation and we'll help you find the right course to start with.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" background="offwhite" ariaLabel="Frequently Asked Questions">
      <div className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          align="left"
        />

        <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-white">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy sm:text-base"
                  >
                    {faq.question}
                    <span className="shrink-0 text-navy/60">
                      {isOpen ? <IconMinus width={18} height={18} /> : <IconPlus width={18} height={18} />}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-muted sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
