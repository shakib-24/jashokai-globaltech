import type { ChangeEvent } from "react";
import FieldShell, { inputClasses, inputErrorClasses } from "./FieldShell";
import { formatSalaryInputDisplay, sanitizeSalaryInput } from "../../_lib/format";

type Props = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function CurrencyField({
  label,
  name,
  required,
  error,
  helperText,
  placeholder = "210,000 – 230,000",
  value,
  onChange,
  className = "",
}: Props) {
  const displayValue = formatSalaryInputDisplay(value);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(sanitizeSalaryInput(e.target.value));
  }

  return (
    <FieldShell
      label={label}
      htmlFor={name}
      required={required}
      error={error}
      helperText={helperText}
    >
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-muted">
          ¥
        </span>
        <input
          id={name}
          name={name}
          type="text"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={`${inputClasses} pl-8 ${error ? inputErrorClasses : ""} ${className}`}
        />
      </div>
    </FieldShell>
  );
}
