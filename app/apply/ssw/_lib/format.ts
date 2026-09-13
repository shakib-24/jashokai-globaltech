// desiredSalary is stored as either a single amount ("210000") or a range
// with one hyphen separating two amounts ("210000-230000").

export function sanitizeSalaryInput(value: string): string {
  let cleaned = value.replace(/[^\d-]/g, "");
  const firstHyphen = cleaned.indexOf("-");
  if (firstHyphen !== -1) {
    cleaned = cleaned.slice(0, firstHyphen + 1) + cleaned.slice(firstHyphen + 1).replace(/-/g, "");
  }
  return cleaned;
}

function formatDigits(digits: string): string {
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

export function formatSalaryInputDisplay(value: string): string {
  if (!value) return "";
  const [first, second] = value.split("-");
  if (second === undefined) return formatDigits(first);
  return `${formatDigits(first)}-${formatDigits(second)}`;
}

export function formatYen(value: string): string {
  if (!value) return "";
  const [first, second] = value.split("-");
  if (!second) return first ? `¥${formatDigits(first)}` : "";
  return `¥${formatDigits(first)} – ¥${formatDigits(second)}`;
}
