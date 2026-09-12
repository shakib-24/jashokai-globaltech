"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "./applicationStore";
import type { SSWApplication } from "../_lib/types";

export function useApplicationData(): SSWApplication {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
