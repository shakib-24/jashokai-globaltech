"use client";

import { useApplication } from "../../_context/ApplicationContext";
import type { FieldErrors } from "../../_lib/types";
import TextAreaField from "../fields/TextAreaField";

export default function StepMotivation({ errors }: { errors: FieldErrors }) {
  const { data, setData } = useApplication();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Motivation & Self Introduction</h2>
      </div>

      <TextAreaField
        label="志望動機 / Motivation"
        name="motivation"
        required
        rows={5}
        helperText="Explain why you want to work in Japan and why you are interested in this field."
        value={data.motivation}
        error={errors.motivation}
        onChange={(e) => setData((prev) => ({ ...prev, motivation: e.target.value }))}
      />

      <TextAreaField
        label="自己PR / Self PR"
        name="selfPR"
        required
        rows={5}
        helperText="Describe your strengths, work attitude, teamwork, learning ability, and relevant experience."
        value={data.selfPR}
        error={errors.selfPR}
        onChange={(e) => setData((prev) => ({ ...prev, selfPR: e.target.value }))}
      />

      <TextAreaField
        label="Personal Requests / Preferences"
        name="personalRequests"
        rows={4}
        helperText="Maps to 本人希望記入欄 — e.g. preferred work location, working hours, salary preferences, or other important requests."
        value={data.personalRequests}
        onChange={(e) => setData((prev) => ({ ...prev, personalRequests: e.target.value }))}
      />
    </div>
  );
}
