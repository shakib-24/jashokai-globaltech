import Container from "../ui/Container";
import Logo from "./Logo";
import {
  CONTACT_EMAIL,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  SOCIAL_LINKS,
  WHATSAPP_DISPLAY,
  buildWhatsAppLink,
} from "../data/contact";

const EXPLORE_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "#courses" },
  { label: "Notice", href: "#notice" },
  { label: "Contact", href: "#contact" },
];

const JAPANESE_COURSES = [
  { name: "N5", desc: "Beginner Level" },
  { name: "N4", desc: "Elementary Level" },
  { name: "JLPT", desc: "Exam Preparation" },
  { name: "JFT-Basic", desc: "Work & Daily Life Japanese" },
];

const STUDENT_LINKS = [
  { label: "Study Abroad", href: "#future-opportunities" },
  { label: "IT Careers", href: "#future-opportunities" },
  { label: "Resources", href: null },
  { label: "FAQ", href: "#faq" },
];

function IconLocation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1 .4 2.2.6 3.4.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.4.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12a8 8 0 1114.1 5.1L20 21l-4.2-1.1A8 8 0 014 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFacebook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.7 8.8h2.3V6.1h-2.5c-2.1 0-3.4 1.4-3.4 3.5v2H8.9v2.9h2.2V21h3v-6.5h2.2l.4-2.9h-2.6V9.7c0-.6.2-.9.6-.9z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconInstagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="6" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconYouTube({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9.3 7.3l8.4 4.7-8.4 4.7V7.3Z" fill="currentColor" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    Icon: IconFacebook,
    bg: "bg-[#1877F2]",
    border: "border-[#6ba3ff]/50",
    glow: "shadow-[0_0_14px_-2px_rgba(24,119,242,0.65)]",
    hoverGlow: "hover:shadow-[0_0_22px_-2px_rgba(24,119,242,0.9)]",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    Icon: IconInstagram,
    bg: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    border: "border-[#ea7bb3]/50",
    glow: "shadow-[0_0_14px_-2px_rgba(221,42,123,0.6)]",
    hoverGlow: "hover:shadow-[0_0_22px_-2px_rgba(221,42,123,0.9)]",
  },
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    Icon: IconYouTube,
    bg: "bg-[#FF0000]",
    border: "border-[#ff6b6b]/50",
    glow: "shadow-[0_0_14px_-2px_rgba(255,0,0,0.6)]",
    hoverGlow: "hover:shadow-[0_0_22px_-2px_rgba(255,0,0,0.9)]",
  },
];

const heading =
  "text-xs font-bold uppercase tracking-[0.14em] text-[#f3c869]";
const navLink = "text-sm text-white/90 transition-colors hover:text-[#f3c869]";
const studentLink = "text-sm text-white/90 transition-colors hover:text-[#d5b3ff]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white">
      {/* top accent line + glow */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f3c869] to-[#a855f7]/70" />
        <div className="-mt-1 h-3 w-full bg-gradient-to-r from-transparent via-[#f3c869]/40 to-[#a855f7]/30 blur-md" />
      </div>

      {/* ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-[#7c3aed]/25 blur-[100px]" />
        <div className="absolute -top-24 right-[8%] h-80 w-80 rounded-full bg-[#c026d3]/15 blur-[120px]" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-gold/25 blur-[110px]" />
      </div>

      <Container className="relative py-10 lg:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.85fr_1.15fr_0.85fr_1.15fr]">
          <div className="flex flex-col gap-3">
            <Logo light />
            <p className="text-sm leading-relaxed text-white/70">
              Born in Jashore.
              <br />
              Built for the world.
            </p>
            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon, bg, border, glow, hoverGlow }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${border} ${bg} text-white ${glow} transition-all duration-200 hover:scale-110 ${hoverGlow}`}
                  >
                    <Icon className="h-[21px] w-[21px]" />
                  </a>
                ) : (
                  <span
                    key={label}
                    aria-label={`${label} (coming soon)`}
                    aria-disabled="true"
                    title="Coming soon"
                    className={`flex h-11 w-11 cursor-default items-center justify-center rounded-full border ${border} ${bg} text-white ${glow} transition-all duration-200 hover:scale-110 ${hoverGlow}`}
                  >
                    <Icon className="h-[21px] w-[21px]" />
                  </span>
                )
              )}
            </div>
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-3">
            <h3 className={heading}>Explore</h3>
            <ul className="flex flex-col gap-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Japanese courses" className="flex flex-col gap-3">
            <h3 className={heading}>Japanese Courses</h3>
            <ul className="flex flex-col gap-2.5">
              {JAPANESE_COURSES.map((course) => (
                <li key={course.name}>
                  <a href="#courses" className="text-sm leading-snug text-white/90 transition-colors hover:text-[#f3c869]">
                    <span className="font-semibold text-white">{course.name}</span>
                    <span className="text-[#E5E7EB]/70"> — </span>
                    <span className="text-[#E5E7EB]">{course.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Students" className="flex flex-col gap-3">
            <h3 className={heading}>Students</h3>
            <ul className="flex flex-col gap-2">
              {STUDENT_LINKS.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <a href={item.href} className={studentLink}>
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label} className="flex items-center gap-1.5 text-sm text-white/55">
                    {item.label}
                    <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-white/50">
                      Soon
                    </span>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className={heading}>Contact</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <IconLocation className="mt-0.5 h-4 w-4 shrink-0 text-[#f3c869]/90" />
                <span className="text-white/80">{LOCATION}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-[#f3c869]/90" />
                <a href={`tel:${PHONE_NUMBER}`} className="transition-colors hover:text-[#f3c869]">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconWhatsApp className="h-4 w-4 shrink-0 text-[#f3c869]/90" />
                <a
                  href={buildWhatsAppLink("Hello JASHOKAI GlobalTech, I'd like to know more about your Japanese courses.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#f3c869]"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 text-[#f3c869]/90" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#f3c869]">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/65 sm:flex-row">
          <p>© {new Date().getFullYear()} JASHOKAI GlobalTech</p>
          <p>
            <a href="#" className="transition-colors hover:text-[#f3c869]">
              Privacy Policy
            </a>{" "}
            · <a href="#" className="transition-colors hover:text-[#f3c869]">Terms</a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
