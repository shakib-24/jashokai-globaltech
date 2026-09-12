import type { Metadata } from "next";
import ResumePageClient from "./_components/ResumePageClient";

export const metadata: Metadata = {
  title: "Japanese Resume Preview | JASHOKAI GlobalTech",
  description:
    "Preview and download your Japanese 履歴書 generated from your SSW applicant profile.",
};

export default function ResumePreviewPage() {
  return <ResumePageClient />;
}
