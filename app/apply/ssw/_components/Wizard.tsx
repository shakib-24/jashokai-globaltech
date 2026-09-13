"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useApplication } from "../_context/ApplicationContext";
import { STEP_LABELS } from "../_lib/constants";
import {
  hasErrors,
  hasListErrors,
  validateEducation,
  validateMotivation,
  validatePersonal,
  validateQualifications,
  validateSSWInfo,
  validateWork,
  type ListErrors,
} from "../_lib/validation";
import type { FieldErrors } from "../_lib/types";
import ProgressBar from "./ProgressBar";
import WizardNav from "./WizardNav";
import StepPersonal from "./steps/StepPersonal";
import StepEducation from "./steps/StepEducation";
import StepWork from "./steps/StepWork";
import StepQualifications from "./steps/StepQualifications";
import StepSSW from "./steps/StepSSW";
import StepMotivation from "./steps/StepMotivation";
import StepReview from "./steps/StepReview";

const EMPTY_LIST_ERRORS: ListErrors = { entries: {} };
const EMPTY_FIELD_ERRORS: FieldErrors = {};
const BLOCKED_MESSAGE = "Please complete the required fields above before continuing.";

export default function Wizard() {
  const router = useRouter();
  const { data, step, setStep, maxStepReached, hydrated } = useApplication();
  const [personalErrors, setPersonalErrors] = useState<FieldErrors>(EMPTY_FIELD_ERRORS);
  const [educationErrors, setEducationErrors] = useState<ListErrors>(EMPTY_LIST_ERRORS);
  const [workErrors, setWorkErrors] = useState<ListErrors>(EMPTY_LIST_ERRORS);
  const [qualificationErrors, setQualificationErrors] = useState<ListErrors>(EMPTY_LIST_ERRORS);
  const [sswErrors, setSSWErrors] = useState<FieldErrors>(EMPTY_FIELD_ERRORS);
  const [motivationErrors, setMotivationErrors] = useState<FieldErrors>(EMPTY_FIELD_ERRORS);
  const [blocked, setBlocked] = useState(false);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    setBlocked(false);
    setStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function focusFirstError() {
    requestAnimationFrame(() => {
      const container = stepContainerRef.current;
      if (!container) return;
      const invalidField = container.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (invalidField) {
        invalidField.scrollIntoView({ behavior: "smooth", block: "center" });
        invalidField.focus({ preventScroll: true });
        return;
      }
      const listError = container.querySelector<HTMLElement>('[role="alert"]');
      listError?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function handleContinue() {
    switch (step) {
      case 0: {
        const errors = validatePersonal(data.personal);
        setPersonalErrors(errors);
        if (hasErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 1: {
        const errors = validateEducation(data.education);
        setEducationErrors(errors);
        if (hasListErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 2: {
        const errors = validateWork(data.workExperience);
        setWorkErrors(errors);
        if (hasListErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 3: {
        const errors = validateQualifications(data.qualifications);
        setQualificationErrors(errors);
        if (hasListErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 4: {
        const errors = validateSSWInfo(data.ssw);
        setSSWErrors(errors);
        if (hasErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 5: {
        const errors = validateMotivation(data);
        setMotivationErrors(errors);
        if (hasErrors(errors)) {
          setBlocked(true);
          focusFirstError();
          return;
        }
        break;
      }
      case 6: {
        router.push("/apply/ssw/resume");
        return;
      }
    }
    goTo(step + 1);
  }

  function handleBack() {
    goTo(Math.max(0, step - 1));
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        Loading your application...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar step={step} maxStepReached={maxStepReached} onStepClick={goTo} />

      <div ref={stepContainerRef} className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        {step === 0 && <StepPersonal errors={personalErrors} />}
        {step === 1 && <StepEducation errors={educationErrors} />}
        {step === 2 && <StepWork errors={workErrors} />}
        {step === 3 && <StepQualifications errors={qualificationErrors} />}
        {step === 4 && <StepSSW errors={sswErrors} />}
        {step === 5 && <StepMotivation errors={motivationErrors} />}
        {step === 6 && <StepReview onEdit={goTo} />}

        <WizardNav
          onBack={handleBack}
          onContinue={handleContinue}
          hideBack={step === 0}
          continueLabel={step === STEP_LABELS.length - 1 ? "Continue to Resume Preview" : "Continue"}
          blockedMessage={blocked ? BLOCKED_MESSAGE : undefined}
        />
      </div>
    </div>
  );
}
