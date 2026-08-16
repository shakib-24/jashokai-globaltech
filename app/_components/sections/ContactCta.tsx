"use client";

import { type FormEvent } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { CONTACT_EMAIL, LOCATION, WHATSAPP_DISPLAY, buildWhatsAppLink } from "../data/contact";

const COURSE_OPTIONS = [
  "Japanese N5",
  "Japanese N4",
  "JLPT Preparation",
  "JFT-Basic Preparation",
  "Not sure yet",
];

export default function ContactCta() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const course = data.get("course");
    const message = data.get("message");

    const lines = [
      `Hello JASHOKAI GlobalTech, I'd like to book a free consultation.`,
      `Name: ${name}`,
      `Phone/WhatsApp: ${phone}`,
      `Interested course: ${course}`,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  }

  return (
    <Section id="contact" background="navy" ariaLabel="Contact and Consultation">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Book Your Free Consultation"
            description="Tell us a little about yourself and we'll reach out on WhatsApp to help you choose the right course."
            align="left"
            light
          />

          <div className="flex flex-col gap-3 text-sm text-white/75">
            <p>{LOCATION}</p>
            <a
              href={buildWhatsAppLink("Hello JASHOKAI GlobalTech, I'd like to know more about your Japanese courses.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit hover:text-white"
            >
              WhatsApp: {WHATSAPP_DISPLAY}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="w-fit hover:text-white">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white p-6 sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-navy">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy outline-none focus:border-navy"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-navy">
              Phone / WhatsApp Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy outline-none focus:border-navy"
              placeholder="e.g. 01XXXXXXXXX"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="course" className="text-sm font-medium text-navy">
              Interested Course
            </label>
            <select
              id="course"
              name="course"
              defaultValue={COURSE_OPTIONS[0]}
              className="min-h-12 rounded-lg border border-line bg-white px-4 text-base text-navy outline-none focus:border-navy"
            >
              {COURSE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-navy">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="rounded-lg border border-line px-4 py-3 text-base text-navy outline-none focus:border-navy"
              placeholder="Anything you'd like us to know"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Send via WhatsApp
          </Button>
        </form>
      </div>
    </Section>
  );
}
