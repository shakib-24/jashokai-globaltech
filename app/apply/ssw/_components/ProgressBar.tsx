"use client";

import { STEP_LABELS } from "../_lib/constants";
import { IconCheck } from "../../../_components/ui/icons";

export default function ProgressBar({
  step,
  maxStepReached,
  onStepClick,
}: {
  step: number;
  maxStepReached: number;
  onStepClick: (index: number) => void;
}) {
  return (
    <nav aria-label="Application progress" className="w-full overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1 sm:min-w-0 sm:justify-between">
        {STEP_LABELS.map((label, index) => {
          const isCurrent = index === step;
          const isCompleted = index < step;
          const isReachable = index <= maxStepReached;

          return (
            <li key={label} className="flex items-center">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onStepClick(index)}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  isCurrent
                    ? "bg-navy text-white"
                    : isCompleted
                      ? "text-navy hover:bg-navy/5"
                      : "text-muted"
                } ${isReachable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    isCurrent
                      ? "bg-gold text-navy"
                      : isCompleted
                        ? "bg-palm/15 text-palm"
                        : "bg-line text-muted"
                  }`}
                >
                  {isCompleted ? <IconCheck width={12} height={12} strokeWidth={3} /> : index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {index < STEP_LABELS.length - 1 && (
                <span className="mx-0.5 h-px w-4 shrink-0 bg-line sm:w-6" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
