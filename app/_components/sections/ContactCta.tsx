"use client";

import { useState, type FormEvent } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const COURSE_OPTIONS = [
  "Japanese N5",
  "Japanese N4",
  "Japanese N3",
  "JFT-Basic",
  "SSW Application Support",
];

const WHATSAPP_NUMBER = "819020575680";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
};

export default function ContactCta() {
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string | null)?.trim() ?? "";
    const email = (data.get("email") as string | null)?.trim() ?? "";
    const phone = (data.get("phone") as string | null)?.trim() ?? "";
    const course = (data.get("course") as string | null)?.trim() ?? "";
    const message = (data.get("message") as string | null)?.trim() ?? "";

    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Please enter your full name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!phone) nextErrors.phone = "Please enter your phone number.";
    if (!course) nextErrors.course = "Please select what you're interested in.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const whatsappMessage = `Hello JASHOKAI GlobalTech,

I would like to make an inquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Interested In: ${course}

Message:
${message || "No additional message"}

Thank you.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <Section id="contact" background="navy" ariaLabel="Contact Us">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[9fr_11fr] lg:gap-16">
        <div className="flex h-full flex-col gap-6">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact Us"
            description="Tell us a little about yourself and we'll get back to you to help you choose the right course."
            align="left"
            light
          />

          {/* Reserved space for a future Google Map / office location embed */}
          <div className="hidden min-h-[240px] flex-1 lg:block" />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] sm:p-7"
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
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-navy">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-navy">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="Your phone number"
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="course" className="text-sm font-medium text-navy">
              Interested In
            </label>
            <select
              id="course"
              name="course"
              defaultValue={COURSE_OPTIONS[0]}
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? "course-error" : undefined}
              className="min-h-12 rounded-lg border border-line bg-white px-4 text-base text-navy outline-none transition-colors focus:border-gold"
            >
              {COURSE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.course && (
              <p id="course-error" className="text-sm text-red-600">
                {errors.course}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-navy">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="rounded-lg border border-line px-4 py-3 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="Anything you'd like us to know"
            />
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 text-base font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </Section>
  );
}
