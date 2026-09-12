import type { TextareaHTMLAttributes } from "react";
import FieldShell, { inputClasses, inputErrorClasses } from "./FieldShell";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
};

export default function TextAreaField({
  label,
  name,
  required,
  error,
  helperText,
  className = "",
  rows = 5,
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
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputClasses} min-h-0 resize-y py-3 leading-relaxed ${
          error ? inputErrorClasses : ""
        } ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}
