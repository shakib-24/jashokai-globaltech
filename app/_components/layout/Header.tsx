"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLockup from "./BrandLockup";
import Container from "../ui/Container";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "SSW Support", href: "/apply/ssw" },
  { label: "Resources", href: "/#jlpt-prep" },
  { label: "About", href: "/#about" },
];

const COURSES_LINKS = [
  { label: "Japanese N5", href: "/courses/n5" },
  { label: "Japanese N4", href: "/courses/n4" },
  { label: "JLPT Preparation", href: "/#jlpt-prep" },
  { label: "JFT-Basic Preparation", href: "/#jlpt-prep" },
];

const UTILITY_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "#" },
];

const NAV_LINK_CLASS =
  "relative text-sm font-medium text-navy/80 transition-colors hover:text-navy after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-red after:transition-all after:duration-200 hover:after:w-full";

const LANGUAGES = [
  { code: "EN", flag: "🇬🇧", name: "English" },
  { code: "JA", flag: "🇯🇵", name: "日本語" },
  { code: "BN", flag: "🇧🇩", name: "বাংলা" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LanguageSelector({ align = "left" }: { align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy transition-colors hover:text-navy/70"
      >
        <span className="text-base leading-none" aria-hidden="true">
          {selected.flag}
        </span>
        {selected.name}
        <ChevronDown className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute top-full z-10 mt-2 w-48 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === selected.code;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelected(lang);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-offwhite ${
                    isSelected ? "bg-offwhite font-semibold text-navy" : "font-medium text-navy/80"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-5 text-center text-base leading-none" aria-hidden="true">
                      {lang.flag}
                    </span>
                    {lang.name}
                  </span>
                  {isSelected && <ChevronDown className="shrink-0 text-red" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CoursesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 ${NAV_LINK_CLASS} ${open ? "text-navy after:w-full" : ""}`}
      >
        Courses
        <ChevronDown className={`text-navy/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-xl"
        >
          {COURSES_LINKS.map((link) => (
            <li key={link.label} role="none">
              <Link
                href={link.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-left text-sm font-medium text-navy/80 transition-colors hover:bg-offwhite hover:text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileCoursesAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-xl text-center text-base font-medium text-navy transition-colors hover:bg-offwhite"
      >
        Courses
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="flex flex-col items-center gap-0.5 pb-1">
          {COURSES_LINKS.map((link) => (
            <li key={link.label} className="w-full">
              <Link
                href={link.href}
                onClick={onNavigate}
                className="flex min-h-11 w-full items-center justify-center rounded-xl text-center text-sm font-medium text-navy/70 transition-colors hover:bg-offwhite hover:text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow ${
        scrolled ? "shadow-[0_4px_12px_rgba(16,24,40,0.06)]" : ""
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-line lg:block">
        <Container className="flex h-8 items-center justify-between">
          <LanguageSelector />
          <div className="flex items-center gap-5">
            {UTILITY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-muted transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Main navbar */}
      <div className="border-b border-line">
        <Container className="flex h-18 items-center justify-between gap-4 sm:h-20">
          <BrandLockup />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <Link key={link.label} href={link.href} className={NAV_LINK_CLASS}>
                {link.label}
              </Link>
            ))}
            <CoursesDropdown />
            {NAV_LINKS.slice(1).map((link) => (
              <Link key={link.label} href={link.href} className={NAV_LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-red px-5 text-sm font-semibold text-red transition-colors hover:bg-red/5"
            >
              Contact
            </Link>
            <Link
              href="/apply"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-red px-5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
            >
              Apply
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector align="right" />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-navy"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-b border-line bg-white px-5 pb-6 pt-3 lg:hidden"
        >
          <ul className="flex flex-col items-center gap-0.5 py-1">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <li key={link.label} className="w-full">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-xl text-center text-base font-medium text-navy transition-colors hover:bg-offwhite"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <MobileCoursesAccordion onNavigate={() => setMenuOpen(false)} />
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.label} className="w-full">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-xl text-center text-base font-medium text-navy transition-colors hover:bg-offwhite"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-2.5 pt-1">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-red text-sm font-semibold text-red transition-colors hover:bg-red/5"
            >
              Contact
            </Link>
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-red text-sm font-semibold text-white transition-colors hover:bg-red-dark"
            >
              Apply
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
