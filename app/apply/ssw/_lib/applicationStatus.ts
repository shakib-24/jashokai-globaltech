import type { SSWApplication } from "./types";

export function hasApplicationData(app: SSWApplication): boolean {
  return app.personal.fullName.trim().length > 0;
}
