export type LogType = "blood_sugar" | "insulin";
export type InsulinKind = "bolus" | "basal";

export interface LogEntry {
  date: string;
  type: LogType;
  kind: string;
  value: number;
  time: string;
  note: string;
}

export interface BloodSugarLog extends Omit<LogEntry, "kind"> {
  type: "blood_sugar";
  kind: "";
}

export interface InsulinLog extends LogEntry {
  type: "insulin";
  kind: InsulinKind;
}

export interface BloodSugarStats {
  average: number;
  highest: number;
  lowest: number;
  count: number;
}
