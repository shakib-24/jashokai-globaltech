import { STORAGE_KEY } from "./constants";
import type { SSWApplication } from "./types";

export function loadApplication(): SSWApplication | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SSWApplication;
  } catch {
    return null;
  }
}

export function saveApplication(data: SSWApplication): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Likely quota exceeded because of embedded file previews.
    // Retry without the heavy data URLs so structured progress isn't lost.
    try {
      const stripped: SSWApplication = {
        ...data,
        personal: {
          ...data.personal,
          photo: data.personal.photo
            ? { ...data.personal.photo, dataUrl: "" }
            : null,
        },
        qualifications: data.qualifications.map((q) => ({
          ...q,
          certificate: q.certificate ? { ...q.certificate, dataUrl: "" } : null,
        })),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
    } catch {
      // Give up silently — in-memory state still holds the user's progress.
    }
  }
}

export function clearApplication(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
