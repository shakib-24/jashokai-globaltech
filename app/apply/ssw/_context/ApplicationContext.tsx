"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  updateApplication,
} from "./applicationStore";
import { useIsHydrated } from "../_lib/useIsHydrated";
import { hasApplicationData } from "../_lib/applicationStatus";
import { STEP_LABELS } from "../_lib/constants";
import type { SSWApplication } from "../_lib/types";

const LAST_STEP = STEP_LABELS.length - 1;

function initialStep(): number {
  return hasApplicationData(getSnapshot()) ? LAST_STEP : 0;
}

type ApplicationContextValue = {
  data: SSWApplication;
  setData: (updater: (prev: SSWApplication) => SSWApplication) => void;
  step: number;
  setStep: (step: number) => void;
  maxStepReached: number;
  hydrated: boolean;
};

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useIsHydrated();
  const [step, setStepState] = useState(initialStep);
  const [maxStepReached, setMaxStepReached] = useState(initialStep);

  const setData = useCallback(
    (updater: (prev: SSWApplication) => SSWApplication) => {
      updateApplication(updater);
    },
    []
  );

  const setStep = useCallback((next: number) => {
    setStepState(next);
    setMaxStepReached((prev) => Math.max(prev, next));
  }, []);

  const value = useMemo(
    () => ({ data, setData, step, setStep, maxStepReached, hydrated }),
    [data, setData, step, setStep, maxStepReached, hydrated]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication(): ApplicationContextValue {
  const ctx = useContext(ApplicationContext);
  if (!ctx) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return ctx;
}
