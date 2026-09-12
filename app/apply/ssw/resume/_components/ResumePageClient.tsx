"use client";

import { useRef, useState } from "react";
import { useApplicationData } from "../../_context/useApplicationData";
import { useIsHydrated } from "../../_lib/useIsHydrated";
import { hasApplicationData } from "../../_lib/applicationStatus";
import { resumeFilename } from "../_lib/filename";
import Button from "../../../../_components/ui/Button";
import Section from "../../../../_components/ui/Section";
import DocumentPreview from "./DocumentPreview";
import MobileReviewCards from "./MobileReviewCards";
import SSWSummaryCard from "./SSWSummaryCard";

type Tab = "document" | "mobile-review";
type PdfStatus = "idle" | "generating" | "error";

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
    />
  );
}

export default function ResumePageClient() {
  const hydrated = useIsHydrated();
  const application = useApplicationData();
  const [tab, setTab] = useState<Tab>("document");
  const [pdfStatus, setPdfStatus] = useState<PdfStatus>("idle");
  const generatingRef = useRef(false);

  async function handleDownload() {
    if (generatingRef.current) return;
    generatingRef.current = true;
    setPdfStatus("generating");

    try {
      const [{ pdf }, pdfDocumentModule, fontsModule] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../_pdf/ResumePdfDocument"),
        import("../_lib/pdfFonts"),
      ]);
      const ResumePdfDocument = pdfDocumentModule.default;
      fontsModule.ensureFontsRegistered();

      const blob = await pdf(<ResumePdfDocument application={application} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = resumeFilename(application.personal.fullName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);

      setPdfStatus("idle");
    } catch (error) {
      console.error("Resume PDF generation failed:", error);
      setPdfStatus("error");
    } finally {
      generatingRef.current = false;
    }
  }

  if (!hydrated) {
    return (
      <Section background="offwhite" ariaLabel="Resume Preview">
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
          Loading your application...
        </div>
      </Section>
    );
  }

  if (!hasApplicationData(application)) {
    return (
      <Section background="offwhite" ariaLabel="Resume Preview">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-line bg-white p-10 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-navy">
            Please complete your SSW application first.
          </h1>
          <p className="text-sm text-muted">
            We couldn&apos;t find a saved application on this device. Start or continue your SSW
            application to generate your Japanese resume.
          </p>
          <Button href="/apply/ssw" variant="primary">
            Go to SSW Application
          </Button>
        </div>
      </Section>
    );
  }

  const isGenerating = pdfStatus === "generating";

  return (
    <Section background="offwhite" ariaLabel="Resume Preview">
      <div className="mx-auto max-w-4xl pb-28 lg:pb-0">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Japanese Resume Preview
          </span>
          <h1 className="text-2xl font-semibold text-navy sm:text-3xl">履歴書 Preview</h1>
          <p className="text-sm text-muted sm:text-base">
            Please review your information carefully before downloading your 履歴書.
          </p>
        </div>

        <div className="mt-6 hidden items-center gap-3 lg:flex">
          <Button href="/apply/ssw" variant="outline">
            Edit Application
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleDownload}
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating && <Spinner />}
            {isGenerating ? "Generating your Japanese resume..." : "Download PDF"}
          </Button>
        </div>

        {pdfStatus === "error" && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-sakura/30 bg-sakura/5 px-4 py-3 text-sm text-sakura"
          >
            We couldn&apos;t generate your resume. Please try again.
          </p>
        )}

        <div className="mt-6 flex gap-2 lg:hidden" role="tablist" aria-label="Resume view">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "document"}
            onClick={() => setTab("document")}
            className={`min-h-11 flex-1 rounded-full px-4 text-sm font-semibold transition-colors ${
              tab === "document" ? "bg-navy text-white" : "border border-line text-navy"
            }`}
          >
            Resume Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "mobile-review"}
            onClick={() => setTab("mobile-review")}
            className={`min-h-11 flex-1 rounded-full px-4 text-sm font-semibold transition-colors ${
              tab === "mobile-review" ? "bg-navy text-white" : "border border-line text-navy"
            }`}
          >
            Mobile Review
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className={tab === "document" ? "block" : "hidden lg:block"}>
            <div className="rounded-2xl bg-neutral-200 p-4 sm:p-8">
              <DocumentPreview application={application} />
            </div>
          </div>

          <div className={tab === "mobile-review" ? "block" : "hidden lg:hidden"}>
            <MobileReviewCards application={application} />
          </div>

          <SSWSummaryCard ssw={application.ssw} />
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <Button href="/apply/ssw" variant="outline" className="flex-1">
          Edit
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1 gap-2"
        >
          {isGenerating && <Spinner />}
          {isGenerating ? "Generating..." : "Download PDF"}
        </Button>
      </div>
    </Section>
  );
}
