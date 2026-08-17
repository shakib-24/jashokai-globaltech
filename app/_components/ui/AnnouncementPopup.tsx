"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { announcement } from "../data/announcement";
import Badge from "./Badge";
import {
  IconChat,
  IconGraduationCap,
  IconHeadset,
  IconLayers,
  IconTarget,
} from "./icons";

const SESSION_KEY = "jashokai-announcement-dismissed";

const TRUST_ICONS = [IconGraduationCap, IconLayers, IconTarget, IconHeadset];

// Popup visibility is derived from sessionStorage — an external system —
// via useSyncExternalStore rather than mirrored into local React state.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return sessionStorage.getItem(SESSION_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

function dismiss() {
  sessionStorage.setItem(SESSION_KEY, "1");
  listeners.forEach((listener) => listener());
}

export default function AnnouncementPopup() {
  const notDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const open = announcement.enabled && notDismissed;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismiss();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/35 p-4"
      onClick={dismiss}
    >
      <style>{`
        @keyframes announcement-pop-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-title"
        aria-describedby="announcement-message"
        onClick={(event) => event.stopPropagation()}
        className="relative w-[90%] max-w-[600px] overflow-hidden rounded-[22px] border border-gold/25 bg-[#fffdf8] p-6 shadow-[0_24px_60px_-20px_rgba(10,31,68,0.35)] motion-safe:[animation:announcement-pop-in_300ms_ease-out] sm:w-[92%] sm:p-8"
      >
        {/* Very subtle sakura watermark — decorative only */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-gold opacity-[0.07]"
        >
          <circle cx="60" cy="30" r="9" fill="currentColor" />
          <circle cx="82" cy="46" r="9" fill="currentColor" />
          <circle cx="74" cy="72" r="9" fill="currentColor" />
          <circle cx="46" cy="72" r="9" fill="currentColor" />
          <circle cx="38" cy="46" r="9" fill="currentColor" />
          <circle cx="60" cy="49" r="7" fill="currentColor" />
        </svg>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-sakura text-white transition-colors motion-reduce:transition-none hover:bg-[#9e3c44] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative text-center">
          <h2 id="announcement-title" className="px-6 text-2xl font-bold text-navy sm:text-3xl">
            {announcement.title}
          </h2>

          <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <p id="announcement-message" className="px-2 text-base text-navy/80">
            {announcement.message}
          </p>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-gold/30 bg-gold/8 px-5 py-4">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-sakura to-gold" />
            <Badge variant="gold" className="mx-auto">
              {announcement.badge}
            </Badge>
            <p className="mt-2 text-lg font-bold leading-snug text-navy sm:text-xl">
              {announcement.highlightTitle}
            </p>
            <p className="text-lg font-bold leading-snug text-navy sm:text-xl">
              {announcement.highlightLead}{" "}
              <span className="text-sakura">{announcement.highlightEmphasis}</span>
            </p>
          </div>

          <p className="mt-4 text-sm text-muted">{announcement.description}</p>
          <p className="mt-1.5 text-sm font-medium text-navy/70">{announcement.motivation}</p>

          <div className="mt-6 flex justify-center">
            <a
              href={announcement.buttonHref}
              onClick={dismiss}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto"
            >
              <IconChat width={18} height={18} strokeWidth={2} />
              {announcement.buttonText}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4 sm:gap-3">
            {announcement.trustItems.map((label, index) => {
              const Icon = TRUST_ICONS[index] ?? TRUST_ICONS[0];
              return (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon width={18} height={18} strokeWidth={1.6} className="text-gold" />
                  <span className="text-[11px] font-medium leading-snug text-navy/70 sm:text-xs">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
