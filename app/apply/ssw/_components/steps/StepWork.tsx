"use client";

import { useApplication } from "../../_context/ApplicationContext";
import { createEmptyWorkEntry } from "../../_lib/defaults";
import { EMPLOYMENT_TYPE_OPTIONS } from "../../_lib/constants";
import type { FieldErrors, WorkEntry } from "../../_lib/types";
import type { ListErrors } from "../../_lib/validation";
import TextField from "../fields/TextField";
import TextAreaField from "../fields/TextAreaField";
import SelectField from "../fields/SelectField";
import YearMonthSelect from "../fields/YearMonthSelect";
import CheckboxField from "../fields/CheckboxField";
import Button from "../../../../_components/ui/Button";
import { IconPlus } from "../../../../_components/ui/icons";

const EMPLOYMENT_OPTIONS = EMPLOYMENT_TYPE_OPTIONS.map((t) => ({ value: t, label: t }));

export default function StepWork({ errors }: { errors: ListErrors }) {
  const { data, setData } = useApplication();
  const list = data.workExperience;

  function updateEntry(id: string, patch: Partial<WorkEntry>) {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }));
  }

  function addEntry() {
    setData((prev) => ({ ...prev, workExperience: [...prev.workExperience, createEmptyWorkEntry()] }));
  }

  function removeEntry(id: string) {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((w) => w.id !== id),
    }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Work Experience</h2>
        <p className="mt-1 text-sm text-muted">
          Maps to 職歴 in your Japanese resume. Leave this empty if you have no prior work experience.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {list.map((entry, index) => (
          <WorkCard
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
        Add Work Experience
      </Button>
    </div>
  );
}

function WorkCard({
  entry,
  index,
  errors,
  onChange,
  onRemove,
}: {
  entry: WorkEntry;
  index: number;
  errors: FieldErrors;
  onChange: (patch: Partial<WorkEntry>) => void;
  onRemove: () => void;
}) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted">
          Work Experience {index + 1}
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
        <TextField
          label="Company / Organization Name"
          name={`work-company-${entry.id}`}
          required
          value={entry.companyName}
          error={errors.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
        />
        <TextField
          label="Country"
          name={`work-country-${entry.id}`}
          required
          value={entry.country}
          error={errors.country}
          onChange={(e) => onChange({ country: e.target.value })}
        />
        <TextField
          label="Job Title / Position"
          name={`work-title-${entry.id}`}
          required
          value={entry.jobTitle}
          error={errors.jobTitle}
          onChange={(e) => onChange({ jobTitle: e.target.value })}
        />
        <SelectField
          label="Employment Type"
          name={`work-type-${entry.id}`}
          required
          options={EMPLOYMENT_OPTIONS}
          value={entry.employmentType}
          error={errors.employmentType}
          onChange={(e) => onChange({ employmentType: e.target.value as WorkEntry["employmentType"] })}
        />
        <YearMonthSelect
          legend="Start Date"
          required
          yearName={`work-start-year-${entry.id}`}
          monthName={`work-start-month-${entry.id}`}
          yearValue={entry.startYear}
          monthValue={entry.startMonth}
          yearError={errors.startYear}
          monthError={errors.startMonth}
          onYearChange={(v) => onChange({ startYear: v })}
          onMonthChange={(v) => onChange({ startMonth: v })}
        />
        <YearMonthSelect
          legend="End Date"
          required={!entry.currentlyWorking}
          disabled={entry.currentlyWorking}
          yearName={`work-end-year-${entry.id}`}
          monthName={`work-end-month-${entry.id}`}
          yearValue={entry.endYear}
          monthValue={entry.endMonth}
          yearError={errors.endYear}
          monthError={errors.endMonth}
          onYearChange={(v) => onChange({ endYear: v })}
          onMonthChange={(v) => onChange({ endMonth: v })}
        />
      </div>

      <CheckboxField
        label="Currently Working Here"
        name={`work-current-${entry.id}`}
        checked={entry.currentlyWorking}
        onChange={(checked) =>
          onChange({ currentlyWorking: checked, endYear: checked ? "" : entry.endYear, endMonth: checked ? "" : entry.endMonth })
        }
      />

      <TextAreaField
        label="Short Job Description"
        name={`work-description-${entry.id}`}
        rows={3}
        value={entry.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </fieldset>
  );
}
