export function slugifyForFilename(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || "applicant";
}

export function resumeFilename(fullName: string): string {
  return `rirekisho_${slugifyForFilename(fullName)}.pdf`;
}

export function fullApplicationFilename(fullName: string): string {
  return `ssw_application_${slugifyForFilename(fullName)}.pdf`;
}
