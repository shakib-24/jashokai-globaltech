"use client";

import { type FormEvent } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const COURSE_OPTIONS = ["Japanese N5", "Japanese N4", "Japanese N3", "JFT-Basic"];

export default function ContactCta() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inquiry = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      course: data.get("course"),
      message: data.get("message"),
    };

    // Email-based inquiry API is not wired up yet — connect it here.
    console.log("Inquiry submitted:", inquiry);
    event.currentTarget.reset();
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
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="Your name"
            />
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
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="your@email.com"
            />
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
              className="min-h-12 rounded-lg border border-line px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold"
              placeholder="Your phone number"
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
              className="min-h-12 rounded-lg border border-line bg-white px-4 text-base text-navy outline-none transition-colors focus:border-gold"
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
