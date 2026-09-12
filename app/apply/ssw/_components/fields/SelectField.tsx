import type { SelectHTMLAttributes } from "react";
import FieldShell, { inputClasses, inputErrorClasses } from "./FieldShell";

type Option = { value: string; label: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  options: Option[];
  placeholder?: string;
};

export default function SelectField({
  label,
  name,
  required,
  error,
  helperText,
  options,
  placeholder = "Select an option",
  className = "",
  ...rest
}: Props) {
  return (
    <FieldShell
      label={label}
      htmlFor={name}
      required={required}
      error={error}
      helperText={helperText}
    >
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputClasses} ${error ? inputErrorClasses : ""} ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
