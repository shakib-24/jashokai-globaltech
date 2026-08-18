// TODO: Replace with real business contact details before launch.
// WHATSAPP_NUMBER is intentionally invalid (contains "X") so the link
// cannot accidentally message a real phone number until it is updated.
export const WHATSAPP_NUMBER = "8801XXXXXXXXX";
export const WHATSAPP_DISPLAY = "+880 1XXX-XXXXXX";
// PHONE_NUMBER is intentionally invalid (contains "X") so the link
// cannot accidentally call a real phone number until it is updated.
export const PHONE_NUMBER = "+8801XXXXXXXXX";
export const PHONE_DISPLAY = "+880 1XXX-XXXXXX";
export const CONTACT_EMAIL = "info@jashokaiglobaltech.example";
export const LOCATION = "Jashore, Bangladesh";
export const OPENING_HOURS = "Hours to be announced";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// TODO: Add real social media profile URLs once accounts are created.
// Leave a value empty to render that icon as a non-navigating placeholder.
export const SOCIAL_LINKS = {
  facebook: "",
  instagram: "",
  youtube: "",
};
