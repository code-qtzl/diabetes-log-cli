import * as fs from "fs";
import csv from "csv-parser";
import type { LogEntry } from "../models/types.js";

const DATA_FILE = "storage.csv";

export function readAllLogs(): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(DATA_FILE)) {
      resolve([]);
      return;
    }

    const results: LogEntry[] = [];

    fs.createReadStream(DATA_FILE)
      .pipe(csv())
      .on("data", (data: any) => {
        // Skip empty rows
        if (!data.Date || !data.Type) {
          return;
        }
        
        results.push({
          date: data.Date,
          type: data.Type,
          kind: data.Kind || "",
          value: parseFloat(data.Value),
          time: data.Time,
          note: data.Note || "",
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}

export async function getLogsByType(type: string): Promise<LogEntry[]> {
  const logs = await readAllLogs();
  return logs.filter((log) => log.type === type && !isNaN(log.value));
}
