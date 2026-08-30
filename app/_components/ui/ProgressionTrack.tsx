import { IconArrowRight } from "./icons";

export default function ProgressionTrack({
  label,
  levels,
  highlightIndex,
}: {
  label: string;
  levels: readonly string[];
  highlightIndex: number;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        {label}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {levels.map((level, i) => (
          <div key={level} className="flex items-center gap-2 sm:gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold sm:px-5 ${
                i === highlightIndex
                  ? "bg-navy text-white"
                  : "border border-line bg-offwhite text-navy"
              }`}
            >
              {level}
            </span>
            {i < levels.length - 1 && (
              <IconArrowRight width={16} height={16} className="text-gold" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
