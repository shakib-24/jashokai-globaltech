export default function RadioGroup({
  label,
  name,
  required,
  error,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-1 text-sakura">*</span>}
      </span>
      <div
        role="radiogroup"
        tabIndex={-1}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`flex flex-wrap gap-2 rounded-lg ${
          error ? "border border-sakura p-2" : ""
        }`}
      >
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                checked
                  ? "border-gold bg-gold/10 text-navy"
                  : "border-line text-muted hover:border-navy/30"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="h-4 w-4 accent-gold"
              />
              {option}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="text-sm text-sakura" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
