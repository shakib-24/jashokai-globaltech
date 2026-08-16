import Container from "../ui/Container";
import Logo from "./Logo";
import Badge from "../ui/Badge";
import {
  CONTACT_EMAIL,
  LOCATION,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  WHATSAPP_DISPLAY,
  buildWhatsAppLink,
} from "../data/contact";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "#courses" },
  { label: "Notice", href: "#notice" },
  { label: "Contact", href: "#contact" },
];

const COURSE_LINKS = [
  { label: "Japanese N5", href: "#courses" },
  { label: "Japanese N4", href: "#courses" },
  { label: "JLPT Preparation", href: "#jlpt-prep" },
  { label: "JFT-Basic Preparation", href: "#jlpt-prep" },
];

const FUTURE_OPPORTUNITIES = ["Study Abroad", "Other Languages", "IT Careers"];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "#faq" },
  { label: "Apply", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-dark text-white">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Born in Jashore. Built for Global Opportunities. Currently offering
            professional Japanese language education, with study abroad,
            other languages, and IT careers on our long-term roadmap.
          </p>
        </div>

        <nav aria-label="Quick links" className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-white/75 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Japanese courses" className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Japanese Courses
          </h3>
          <ul className="flex flex-col gap-2.5">
            {COURSE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-white/75 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Future Opportunities
          </h3>
          <ul className="flex flex-col gap-2.5">
            {FUTURE_OPPORTUNITIES.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <span className="text-sm text-white/60">{label}</span>
                <Badge variant="light" className="px-2 py-0.5 text-[10px]">
                  Coming Soon
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Support" className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Support
          </h3>
          <ul className="flex flex-col gap-2.5">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-white/75 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Contact
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/75">
            <li className="font-medium text-white">JASHOKAI GlobalTech</li>
            <li>{LOCATION}</li>
            <li>
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink("Hello JASHOKAI GlobalTech, I'd like to know more about your Japanese courses.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>{OPENING_HOURS}</li>
            {/* TODO: add social media links once accounts are created */}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} JASHOKAI GlobalTech. All rights reserved.</p>
          <p>Languages • Study Abroad • IT Careers</p>
        </Container>
      </div>
    </footer>
  );
}
