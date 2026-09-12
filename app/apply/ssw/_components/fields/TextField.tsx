import type { InputHTMLAttributes } from "react";
import FieldShell, { inputClasses, inputErrorClasses } from "./FieldShell";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
};

export default function TextField({
  label,
  name,
  required,
  error,
  helperText,
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
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputClasses} ${error ? inputErrorClasses : ""} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}
