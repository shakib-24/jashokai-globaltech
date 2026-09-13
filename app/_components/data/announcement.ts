// Reusable announcement popup content. Edit these fields to change
// what the homepage popup shows — no JSX changes required.
export const announcement = {
  enabled: true,
  badge: "SSW SUPPORT",
  title: "জাপানে SSW ভিসায় নতুন ক্যারিয়ার শুরু করুন",
  description:
    "যোগ্য প্রার্থীদের জন্য SSW আবেদন, প্রয়োজনীয় ডকুমেন্ট প্রস্তুতি এবং জাপানে কাজের প্রক্রিয়া সম্পর্কে সহায়তা নিয়ে আমরা আছি আপনার পাশে।\nJFT-Basic অথবা JLPT N4 পাস এবং সংশ্লিষ্ট Skill Test Certificate থাকলে আজই আমাদের সাথে যোগাযোগ করুন।",
  buttonText: "যোগাযোগ করুন",
  buttonHref: "#contact",
  secondaryText: "বিস্তারিত জানুন",
  // Set to a route or "#section-id" once a dedicated SSW info page/section exists.
  secondaryHref: null as string | null,
  trustItems: [
    "Application Support",
    "Document Guidance",
    "Japanese Preparation",
    "Job Process Guidance",
  ],
};
