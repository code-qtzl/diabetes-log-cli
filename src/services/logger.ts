import * as fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { format } from "date-fns";
import chalk from "chalk";
import type { LogEntry, InsulinKind } from "../models/types.js";

const DATA_FILE = "storage.csv";
const HEADER = [
  { id: "date", title: "Date" },
  { id: "type", title: "Type" },
  { id: "kind", title: "Kind" },
  { id: "value", title: "Value" },
  { id: "time", title: "Time" },
  { id: "note", title: "Note" },
];

async function ensureHeader(): Promise<void> {
  if (!fs.existsSync(DATA_FILE) || fs.statSync(DATA_FILE).size === 0) {
    const csvWriter = createObjectCsvWriter({
      path: DATA_FILE,
      header: HEADER,
    });
    await csvWriter.writeRecords([]);
  }
}

export async function logBloodSugar(
  value: number,
  time?: string,
  note: string = ""
): Promise<void> {
  await ensureHeader();
  
  const currentTime = time || format(new Date(), "HH:mm");
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const csvWriter = createObjectCsvWriter({
    path: DATA_FILE,
    header: HEADER,
    append: true,
  });

  const record: LogEntry = {
    date: currentDate,
    type: "blood_sugar",
    kind: "",
    value,
    time: currentTime,
    note,
  };

  await csvWriter.writeRecords([record]);
  console.log(
    chalk.green(`[✓] Logged blood sugar: ${value} mg/dL at ${currentTime}`)
  );
}

export async function logInsulin(
  kind: InsulinKind,
  amount: number,
  time?: string,
  note: string = ""
): Promise<void> {
  await ensureHeader();
  
  const currentTime = time || format(new Date(), "HH:mm");
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const csvWriter = createObjectCsvWriter({
    path: DATA_FILE,
    header: HEADER,
    append: true,
  });

  const record: LogEntry = {
    date: currentDate,
    type: "insulin",
    kind,
    value: amount,
    time: currentTime,
    note,
  };

  await csvWriter.writeRecords([record]);
  console.log(
    chalk.green(`[✓] Logged insulin: ${amount} units (${kind}) at ${currentTime}`)
  );
}
