"use client";

import { useApplication } from "../../_context/ApplicationContext";
import { createEmptyEducationEntry } from "../../_lib/defaults";
import {
  EDUCATION_COURSE_TYPE_OPTIONS,
  EDUCATION_STATUS_OPTIONS,
  SUBJECT_MAJOR_COURSE_TYPES,
} from "../../_lib/constants";
import type { EducationEntry, FieldErrors } from "../../_lib/types";
import type { ListErrors } from "../../_lib/validation";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import YearMonthSelect from "../fields/YearMonthSelect";
import Button from "../../../../_components/ui/Button";
import { IconPlus } from "../../../../_components/ui/icons";

const STATUS_OPTIONS = EDUCATION_STATUS_OPTIONS.map((s) => ({ value: s, label: s }));
const COURSE_TYPE_OPTIONS = EDUCATION_COURSE_TYPE_OPTIONS.map((c) => ({ value: c, label: c }));
const SUBJECT_MAJOR_COURSE_TYPE_SET = new Set<string>(SUBJECT_MAJOR_COURSE_TYPES);

function sortByStart(list: EducationEntry[]): EducationEntry[] {
  return [...list].sort((a, b) => {
    const aKey = `${a.startYear || "9999"}${a.startMonth || "12"}`;
    const bKey = `${b.startYear || "9999"}${b.startMonth || "12"}`;
    return aKey.localeCompare(bKey);
  });
}

export default function StepEducation({ errors }: { errors: ListErrors }) {
  const { data, setData } = useApplication();
  const list = data.education;

  function updateEntry(id: string, patch: Partial<EducationEntry>) {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }

  function addEntry() {
    setData((prev) => ({ ...prev, education: [...prev.education, createEmptyEducationEntry()] }));
  }

  function removeEntry(id: string) {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }

  function moveEntry(id: string, direction: -1 | 1) {
    setData((prev) => {
      const index = prev.education.findIndex((e) => e.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= prev.education.length) return prev;
      const next = [...prev.education];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, education: next };
    });
  }

  function applySort() {
    setData((prev) => ({ ...prev, education: sortByStart(prev.education) }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Education History</h2>
        <p className="mt-1 text-sm text-muted">Maps to 学歴 in your Japanese resume.</p>
      </div>

      {errors.listError && (
        <p className="rounded-lg border border-sakura/30 bg-sakura/5 px-4 py-3 text-sm text-sakura" role="alert">
          {errors.listError}
        </p>
      )}

      <div className="flex flex-col gap-5">
        {list.map((entry, index) => (
          <EducationCard
            key={entry.id}
            entry={entry}
            index={index}
            total={list.length}
            errors={errors.entries[entry.id] ?? {}}
            onChange={(patch) => updateEntry(entry.id, patch)}
            onRemove={() => removeEntry(entry.id)}
            onMove={(direction) => moveEntry(entry.id, direction)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={addEntry} className="gap-2">
          <IconPlus width={16} height={16} />
          Add Education
        </Button>
        {list.length > 1 && (
          <button
            type="button"
            onClick={applySort}
            className="text-sm font-medium text-navy/70 hover:text-navy hover:underline"
          >
            Sort oldest to newest
          </button>
        )}
      </div>
    </div>
  );
}

function EducationCard({
  entry,
  index,
  total,
  errors,
  onChange,
  onRemove,
  onMove,
}: {
  entry: EducationEntry;
  index: number;
  total: number;
  errors: FieldErrors;
  onChange: (patch: Partial<EducationEntry>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted">
          Education {index + 1}
        </legend>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            aria-label="Move up"
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy/60 hover:bg-navy/5 disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            aria-label="Move down"
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy/60 hover:bg-navy/5 disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 text-sm font-medium text-sakura hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="School / Institution Name"
          name={`edu-school-${entry.id}`}
          required
          value={entry.schoolName}
          error={errors.schoolName}
          onChange={(e) => onChange({ schoolName: e.target.value })}
        />
        <TextField
          label="Country"
          name={`edu-country-${entry.id}`}
          placeholder="Optional"
          value={entry.country}
          error={errors.country}
          onChange={(e) => onChange({ country: e.target.value })}
        />
        <SelectField
          label="Education Type / Course"
          name={`edu-course-type-${entry.id}`}
          options={COURSE_TYPE_OPTIONS}
          value={entry.courseType}
          onChange={(e) =>
            onChange({ courseType: e.target.value as EducationEntry["courseType"] })
          }
        />
        {SUBJECT_MAJOR_COURSE_TYPE_SET.has(entry.courseType) && (
          <TextField
            label="Subject / Major"
            name={`edu-subject-major-${entry.id}`}
            placeholder="e.g. Computer Science, Business Administration, Accounting"
            value={entry.subjectMajor}
            onChange={(e) => onChange({ subjectMajor: e.target.value })}
          />
        )}
        <SelectField
          label="Status"
          name={`edu-status-${entry.id}`}
          required
          options={STATUS_OPTIONS}
          value={entry.status}
          error={errors.status}
          onChange={(e) => onChange({ status: e.target.value as EducationEntry["status"] })}
        />
        <YearMonthSelect
          legend="Start Date"
          required
          yearName={`edu-start-year-${entry.id}`}
          monthName={`edu-start-month-${entry.id}`}
          yearValue={entry.startYear}
          monthValue={entry.startMonth}
          yearError={errors.startYear}
          monthError={errors.startMonth}
          onYearChange={(v) => onChange({ startYear: v })}
          onMonthChange={(v) => onChange({ startMonth: v })}
        />
        <YearMonthSelect
          legend="End Date"
          required={entry.status !== "Currently Enrolled"}
          disabled={entry.status === "Currently Enrolled"}
          yearName={`edu-end-year-${entry.id}`}
          monthName={`edu-end-month-${entry.id}`}
          yearValue={entry.endYear}
          monthValue={entry.endMonth}
          yearError={errors.endYear}
          monthError={errors.endMonth}
          onYearChange={(v) => onChange({ endYear: v })}
          onMonthChange={(v) => onChange({ endMonth: v })}
        />
      </div>
    </fieldset>
  );
}
