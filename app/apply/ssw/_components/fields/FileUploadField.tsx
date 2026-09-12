"use client";

import { useId, useState } from "react";
import { formatFileSize, readFileAsUploadedFile } from "../../_lib/files";
import type { UploadedFile } from "../../_lib/types";
import FieldShell from "./FieldShell";
import { IconCheck } from "../../../../_components/ui/icons";

export default function FileUploadField({
  label,
  required,
  error,
  helperText,
  value,
  onChange,
  accept = "image/png,image/jpeg",
  maxSizeBytes,
  variant = "photo",
}: {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  value: UploadedFile | null;
  onChange: (file: UploadedFile | null) => void;
  accept?: string;
  maxSizeBytes: number;
  variant?: "photo" | "document";
}) {
  const id = useId();
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  async function handleFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    if (file.size > maxSizeBytes) {
      setLocalError(
        `File is too large. Please upload a file under ${formatFileSize(maxSizeBytes)}.`
      );
      return;
    }

    setLocalError(undefined);
    const uploaded = await readFileAsUploadedFile(file);
    onChange(uploaded);
  }

  const displayError = error ?? localError;

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      required={required}
      error={displayError}
      helperText={helperText}
    >
      <div className="flex flex-wrap items-center gap-4">
        {value && variant === "photo" && value.dataUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable asset
          <img
            src={value.dataUrl}
            alt="Uploaded resume photo preview"
            className="h-32 w-24 shrink-0 rounded-lg border border-line object-cover"
          />
        )}
        {value && variant === "document" && (
          <span className="flex items-center gap-2 rounded-lg border border-line bg-offwhite px-3 py-2 text-sm text-navy">
            <IconCheck width={16} height={16} className="text-palm" />
            {value.name}
            <span className="text-xs text-muted">{formatFileSize(value.size)}</span>
          </span>
        )}

        <div className="flex flex-col gap-2">
          <input
            id={id}
            type="file"
            accept={accept}
            aria-invalid={Boolean(displayError)}
            aria-describedby={displayError ? `${id}-error` : undefined}
            onChange={(e) => {
              void handleFile(e.target.files);
              e.target.value = "";
            }}
            className="block text-sm text-muted file:mr-3 file:min-h-11 file:rounded-full file:border-0 file:bg-navy file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-light file:cursor-pointer cursor-pointer"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="self-start text-xs font-medium text-sakura hover:underline"
            >
              Remove file
            </button>
          )}
        </div>
      </div>
    </FieldShell>
  );
}
