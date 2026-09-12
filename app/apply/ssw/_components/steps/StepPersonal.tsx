"use client";

import { useApplication } from "../../_context/ApplicationContext";
import { GENDER_OPTIONS, MAX_IMAGE_SIZE_BYTES } from "../../_lib/constants";
import type { FieldErrors } from "../../_lib/types";
import TextField from "../fields/TextField";
import TextAreaField from "../fields/TextAreaField";
import RadioGroup from "../fields/RadioGroup";
import FileUploadField from "../fields/FileUploadField";

export default function StepPersonal({ errors }: { errors: FieldErrors }) {
  const { data, setData } = useApplication();
  const personal = data.personal;

  function update<K extends keyof typeof personal>(key: K, value: (typeof personal)[K]) {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-navy">Personal Information</h2>
        <p className="mt-1 text-sm text-muted">
          This forms the basis of your Japanese resume (履歴書).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          label="Full Name"
          name="fullName"
          required
          placeholder="Md Hasan Ali"
          value={personal.fullName}
          error={errors.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        <TextField
          label="Name in Katakana"
          name="nameKatakana"
          required
          placeholder="ハサン アリ"
          value={personal.nameKatakana}
          error={errors.nameKatakana}
          helperText="Write your name using Katakana characters, as used in Japanese resumes."
          onChange={(e) => update("nameKatakana", e.target.value)}
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          required
          value={personal.dateOfBirth}
          error={errors.dateOfBirth}
          onChange={(e) => update("dateOfBirth", e.target.value)}
        />
        <RadioGroup
          label="Gender"
          name="gender"
          required
          options={GENDER_OPTIONS}
          value={personal.gender}
          error={errors.gender}
          onChange={(value) => update("gender", value as typeof personal.gender)}
        />
        <TextField
          label="Nationality"
          name="nationality"
          required
          placeholder="Bangladesh"
          value={personal.nationality}
          error={errors.nationality}
          onChange={(e) => update("nationality", e.target.value)}
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          placeholder="Optional"
          value={personal.postalCode}
          onChange={(e) => update("postalCode", e.target.value)}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          placeholder="+880 1XXXXXXXXX"
          value={personal.phone}
          error={errors.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          value={personal.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <TextAreaField
        label="Current Address"
        name="currentAddress"
        required
        rows={3}
        placeholder="House, Road, City, Country"
        value={personal.currentAddress}
        error={errors.currentAddress}
        onChange={(e) => update("currentAddress", e.target.value)}
      />

      <FileUploadField
        label="Profile / Resume Photo"
        required
        variant="photo"
        accept="image/png,image/jpeg,image/jpg"
        maxSizeBytes={MAX_IMAGE_SIZE_BYTES}
        value={personal.photo}
        error={errors.photo}
        helperText="Please upload a clear upper-body resume photo. JPG, JPEG or PNG, displayed in a resume-friendly portrait ratio."
        onChange={(file) => update("photo", file)}
      />
    </div>
  );
}
