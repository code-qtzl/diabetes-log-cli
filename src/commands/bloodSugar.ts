import { logBloodSugar } from "../services/logger.js";

export async function bloodSugarCommand(
  value: number,
  time?: string,
  note?: string
): Promise<void> {
  if (value <= 0) {
    console.error("Value must be positive.");
    return;
  }
  await logBloodSugar(value, time, note);
}
