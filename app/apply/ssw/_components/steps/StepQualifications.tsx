"use client";

import { useApplication } from "../../_context/ApplicationContext";
import { createEmptyQualificationEntry } from "../../_lib/defaults";
import { MAX_CERTIFICATE_SIZE_BYTES, QUALIFICATION_TYPE_OPTIONS } from "../../_lib/constants";
import type { FieldErrors, QualificationEntry } from "../../_lib/types";
import type { ListErrors } from "../../_lib/validation";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import FileUploadField from "../fields/FileUploadField";
import Button from "../../../../_components/ui/Button";
import { IconPlus } from "../../../../_components/ui/icons";

const TYPE_OPTIONS = QUALIFICATION_TYPE_OPTIONS.map((t) => ({ value: t, label: t }));

export default function StepQualifications({ errors }: { errors: ListErrors }) {
  const { data, setData } = useApplication();
  const list = data.qualifications;

  function updateEntry(id: string, patch: Partial<QualificationEntry>) {
    setData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    }));
  }

  function addEntry() {
    setData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, createEmptyQualificationEntry()],
    }));
  }

  function removeEntry(id: string) {
    setData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((q) => q.id !== id),
    }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Qualifications & Certificates</h2>
        <p className="mt-1 text-sm text-muted">
          Add any relevant qualifications. It&apos;s fine to skip this step if you don&apos;t have
          any yet — this maps partly to 資格・免許.
        </p>
      </div>

      {list.length === 0 && (
        <p className="rounded-lg border border-line bg-offwhite px-4 py-3 text-sm text-muted">
          No qualifications added yet.
        </p>
      )}

      <div className="flex flex-col gap-5">
        {list.map((entry, index) => (
          <QualificationCard
            key={entry.id}
            entry={entry}
            index={index}
            errors={errors.entries[entry.id] ?? {}}
            onChange={(patch) => updateEntry(entry.id, patch)}
            onRemove={() => removeEntry(entry.id)}
          />
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addEntry} className="w-fit gap-2">
        <IconPlus width={16} height={16} />
        Add Qualification
      </Button>
    </div>
  );
}

function QualificationCard({
  entry,
  index,
  errors,
  onChange,
  onRemove,
}: {
  entry: QualificationEntry;
  index: number;
  errors: FieldErrors;
  onChange: (patch: Partial<QualificationEntry>) => void;
  onRemove: () => void;
}) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted">
          Qualification {index + 1}
        </legend>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm font-medium text-sakura hover:underline"
        >
          Delete
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Qualification Type"
          name={`qual-type-${entry.id}`}
          required
          options={TYPE_OPTIONS}
          value={entry.type}
          error={errors.type}
          onChange={(e) => onChange({ type: e.target.value as QualificationEntry["type"] })}
        />
        <TextField
          label="Qualification / Certificate Name"
          name={`qual-name-${entry.id}`}
          required
          value={entry.name}
          error={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <TextField
          label="Level"
          name={`qual-level-${entry.id}`}
          placeholder="e.g. N4, Level 2"
          value={entry.level}
          onChange={(e) => onChange({ level: e.target.value })}
        />
        <TextField
          label="Date Passed / Obtained"
          name={`qual-date-${entry.id}`}
          type="date"
          required
          value={entry.datePassed}
          error={errors.datePassed}
          onChange={(e) => onChange({ datePassed: e.target.value })}
        />
        <TextField
          label="Certificate Number"
          name={`qual-number-${entry.id}`}
          placeholder="Optional"
          value={entry.certificateNumber}
          onChange={(e) => onChange({ certificateNumber: e.target.value })}
        />
      </div>

      <FileUploadField
        label="Upload Certificate"
        variant="document"
        accept="application/pdf,image/png,image/jpeg,image/jpg"
        maxSizeBytes={MAX_CERTIFICATE_SIZE_BYTES}
        value={entry.certificate}
        helperText="PDF, JPG or PNG. Optional."
        onChange={(file) => onChange({ certificate: file })}
      />
    </fieldset>
  );
}
