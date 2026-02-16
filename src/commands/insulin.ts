import { logInsulin } from "../services/logger.js";
import type { InsulinKind } from "../models/types.js";

export async function insulinCommand(
  kind: InsulinKind,
  amount: number,
  time?: string,
  note?: string
): Promise<void> {
  if (amount <= 0) {
    console.error("Amount must be positive.");
    return;
  }
  if (kind !== "bolus" && kind !== "basal") {
    console.error("Kind must be either 'bolus' or 'basal'.");
    return;
  }
  await logInsulin(kind, amount, time, note);
}
