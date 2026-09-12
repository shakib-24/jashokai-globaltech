import type { ReactNode } from "react";

export default function FieldShell({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-1 text-sakura">*</span>}
      </label>
      {helperText && <p className="text-xs text-muted">{helperText}</p>}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-sakura" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  "min-h-12 w-full rounded-lg border border-line bg-white px-4 text-base text-navy placeholder:text-muted/70 outline-none transition-colors focus:border-gold disabled:bg-offwhite disabled:text-muted";

export const inputErrorClasses = "border-sakura focus:border-sakura";
