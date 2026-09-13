import { IconInfo } from "../../../_components/ui/icons";

export default function PassportNotice() {
  return (
    <div className="flex gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:p-5">
      <IconInfo width={20} height={20} className="mt-0.5 shrink-0 text-gold" />
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold text-navy">Important — Passport Information</p>
        <p className="text-sm text-navy/80">
          Please enter all personal information exactly as shown on your passport or official
          documents.
        </p>
        <p className="text-xs text-muted">
          This information will be used to create your Japanese resume, so please check all
          details carefully before continuing.
        </p>
      </div>
    </div>
  );
}
