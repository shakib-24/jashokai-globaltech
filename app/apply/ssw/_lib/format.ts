export function sanitizeDigits(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function formatYen(value: string): string {
  const digits = sanitizeDigits(value);
  if (!digits) return "";
  return `¥${Number(digits).toLocaleString("en-US")}`;
}
