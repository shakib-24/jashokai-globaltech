import { MONTH_OPTIONS, getYearOptions } from "../../_lib/constants";
import SelectField from "./SelectField";

const YEAR_OPTIONS = getYearOptions().map((y) => ({ value: y, label: y }));
const MONTHS = MONTH_OPTIONS.map((m) => ({ value: m.value, label: m.label }));

export default function YearMonthSelect({
  legend,
  required,
  yearName,
  monthName,
  yearValue,
  monthValue,
  yearError,
  monthError,
  onYearChange,
  onMonthChange,
  disabled,
}: {
  legend: string;
  required?: boolean;
  yearName: string;
  monthName: string;
  yearValue: string;
  monthValue: string;
  yearError?: string;
  monthError?: string;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy">
        {legend}
        {required && <span className="ml-1 text-sakura">*</span>}
      </span>
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Year"
          name={yearName}
          options={YEAR_OPTIONS}
          value={yearValue}
          error={yearError}
          disabled={disabled}
          placeholder="Year"
          onChange={(e) => onYearChange(e.target.value)}
        />
        <SelectField
          label="Month"
          name={monthName}
          options={MONTHS}
          value={monthValue}
          error={monthError}
          disabled={disabled}
          placeholder="Month"
          onChange={(e) => onMonthChange(e.target.value)}
        />
      </div>
    </div>
  );
}
