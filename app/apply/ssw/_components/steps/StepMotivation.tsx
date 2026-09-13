"use client";

import { useApplication } from "../../_context/ApplicationContext";
import type { FieldErrors } from "../../_lib/types";
import TextAreaField from "../fields/TextAreaField";

function JapaneseBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-navy">
      日本語で入力
    </span>
  );
}

export default function StepMotivation({ errors }: { errors: FieldErrors }) {
  const { data, setData } = useApplication();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Motivation & Self Introduction</h2>
      </div>

      <div className="flex flex-col gap-1.5 rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:p-5">
        <p className="text-sm font-semibold text-navy">
          Please answer the following sections in Japanese.
        </p>
        <p className="text-sm text-navy/80">
          These answers will be used directly in your Japanese 履歴書.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <JapaneseBadge />
        <TextAreaField
          label="志望動機 / Motivation"
          name="motivation"
          required
          rows={5}
          helperText="日本語で入力してください。"
          value={data.motivation}
          error={errors.motivation}
          onChange={(e) => setData((prev) => ({ ...prev, motivation: e.target.value }))}
        />
        <p className="text-xs italic text-muted">
          例：日本で働きながら新しい技能を学び、将来はその経験を母国でも活かしたいと考えています。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <JapaneseBadge />
        <TextAreaField
          label="自己PR / Self PR"
          name="selfPR"
          required
          rows={5}
          helperText="日本語で入力してください。"
          value={data.selfPR}
          error={errors.selfPR}
          onChange={(e) => setData((prev) => ({ ...prev, selfPR: e.target.value }))}
        />
        <p className="text-xs italic text-muted">
          例：私は新しいことを学ぶ意欲が強く、最後まであきらめずに取り組むことができます。また、チームワークを大切にしています。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <JapaneseBadge />
        <TextAreaField
          label="本人希望記入欄 / Personal Requests"
          name="personalRequests"
          rows={4}
          helperText="希望がある場合は日本語で入力してください。"
          value={data.personalRequests}
          onChange={(e) => setData((prev) => ({ ...prev, personalRequests: e.target.value }))}
        />
        <p className="text-xs italic text-muted">
          例：勤務地は関東地方を希望します。特に希望がない場合は「特になし」とご記入ください。
        </p>
      </div>
    </div>
  );
}
