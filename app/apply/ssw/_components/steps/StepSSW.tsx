"use client";

import { useApplication } from "../../_context/ApplicationContext";
import { HOUSING_PREFERENCE_OPTIONS, SSW_FIELD_OPTIONS } from "../../_lib/constants";
import type { FieldErrors, SSWInfo } from "../../_lib/types";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import CurrencyField from "../fields/CurrencyField";

const FIELD_OPTIONS = SSW_FIELD_OPTIONS.map((f) => ({ value: f, label: f }));
const HOUSING_OPTIONS = HOUSING_PREFERENCE_OPTIONS.map((h) => ({ value: h, label: h }));

export default function StepSSW({ errors }: { errors: FieldErrors }) {
  const { data, setData } = useApplication();
  const ssw = data.ssw;

  function update<K extends keyof SSWInfo>(key: K, value: SSWInfo[K]) {
    setData((prev) => ({ ...prev, ssw: { ...prev.ssw, [key]: value } }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">SSW Application Information</h2>
        <p className="mt-1 text-sm text-muted">
          Tell us about the role and conditions you&apos;re looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          label="Desired SSW Field"
          name="desiredField"
          required
          options={FIELD_OPTIONS}
          value={ssw.desiredField}
          error={errors.desiredField}
          onChange={(e) => update("desiredField", e.target.value as SSWInfo["desiredField"])}
        />
        <CurrencyField
          label="Desired Monthly Salary"
          name="desiredSalary"
          placeholder="210,000 – 230,000"
          value={ssw.desiredSalary}
          onChange={(value) => update("desiredSalary", value)}
        />
        <TextField
          label="Preferred Work Location"
          name="preferredLocation"
          placeholder="Tokyo / Chiba / Saitama / Anywhere in Japan"
          value={ssw.preferredLocation}
          onChange={(e) => update("preferredLocation", e.target.value)}
        />
        <SelectField
          label="Housing Preference"
          name="housingPreference"
          options={HOUSING_OPTIONS}
          value={ssw.housingPreference}
          onChange={(e) => update("housingPreference", e.target.value as SSWInfo["housingPreference"])}
        />
        <TextField
          label="Passport Number"
          name="passportNumber"
          placeholder="Optional"
          value={ssw.passportNumber}
          onChange={(e) => update("passportNumber", e.target.value)}
        />
      </div>
    </div>
  );
}
