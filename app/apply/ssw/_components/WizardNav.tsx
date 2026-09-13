import Button from "../../../_components/ui/Button";
import { IconArrowRight } from "../../../_components/ui/icons";

export default function WizardNav({
  onBack,
  onContinue,
  backLabel = "Back",
  continueLabel = "Continue",
  hideBack = false,
  blockedMessage,
}: {
  onBack?: () => void;
  onContinue: () => void;
  backLabel?: string;
  continueLabel?: string;
  hideBack?: boolean;
  blockedMessage?: string;
}) {
  return (
    <div className="sticky bottom-0 -mx-5 mt-8 flex flex-col gap-3 border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
      {blockedMessage && (
        <p
          className="rounded-lg border border-sakura/30 bg-sakura/5 px-4 py-2.5 text-sm text-sakura"
          role="alert"
        >
          {blockedMessage}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        {!hideBack ? (
          <Button type="button" variant="outline" onClick={onBack} className="px-5">
            {backLabel}
          </Button>
        ) : (
          <span />
        )}
        <Button type="button" variant="primary" onClick={onContinue} className="gap-2 px-6">
          {continueLabel}
          <IconArrowRight width={18} height={18} />
        </Button>
      </div>
    </div>
  );
}
