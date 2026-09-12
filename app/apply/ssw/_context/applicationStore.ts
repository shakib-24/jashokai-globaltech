import { createEmptyApplication } from "../_lib/defaults";
import { loadApplication, saveApplication } from "../_lib/storage";
import type { SSWApplication } from "../_lib/types";

type Listener = () => void;

let currentData: SSWApplication = createEmptyApplication();
let initialized = false;
const listeners = new Set<Listener>();

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;
  const stored = loadApplication();
  if (stored) currentData = stored;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): SSWApplication {
  ensureInitialized();
  return currentData;
}

export function getServerSnapshot(): SSWApplication {
  return currentData;
}

export function updateApplication(
  updater: (prev: SSWApplication) => SSWApplication
): void {
  ensureInitialized();
  currentData = updater(currentData);
  saveApplication(currentData);
  listeners.forEach((listener) => listener());
}
